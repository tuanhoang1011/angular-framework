import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty } from 'lodash';
import { environment } from 'projects/webdoctor/src/environments/environment';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, finalize, skip, switchMap, takeUntil, tap, timeout } from 'rxjs/operators';

import { APIRoutes } from '../../../network-services/api-routes';
import { AuthAPIService } from '../../../network-services/api/auth-api.service';
import { AppRoutes } from '../../../routers/app.routes';
import { AuthRoutes } from '../../../routers/authentication.routes';
import { PublicLayoutRoutes } from '../../../routers/layout-public.routes';
import { LoadingService } from '../../components/loading/loading.service';
import { MessageService } from '../../components/message/message.service';
import { ErrorCode } from '../../constant/error-code';
import { LogActiveScreen, LogMessage, LogSubType, LogType } from '../../constant/logger';
import { isPublicPages } from '../../helper/common-helper';
import { ErrorResponse } from '../../interfaces/http-response';
import { LogContent } from '../../interfaces/logger';
import { MessageOptions } from '../../interfaces/message';
import { AuthService } from '../../services/auth/auth.service';
import { LoggerService } from '../../services/log/logger.service';
import { GlobalVariables } from '../variables/global-variable';
import { HttpBaseService } from './http-base.service';

const requiredAPI = [
    { apiRoute: APIRoutes.Log, method: 'POST' },
    { apiRoute: APIRoutes.Login, method: 'POST' },
    { apiRoute: APIRoutes.RefreshToken, method: 'POST' },
    { apiRoute: APIRoutes.ChangeRealPW, method: 'PUT' },
    { apiRoute: APIRoutes.ChangeTempPW, method: 'PUT' },
    { apiRoute: APIRoutes.Logout, method: 'PUT' },
    { apiRoute: APIRoutes.Profile, method: 'GET' }
];

// decrease/increase pending for required APIs, all these APIs completely => cancelable
const processPendingAPI = (req: HttpRequest<any>, isIncrease: boolean) => {
    if (requiredAPI.find((x) => req.url.includes(x.apiRoute) && req.method === x.method)) {
        if (isIncrease) {
            GlobalVariables.pendingRequiredAPICount++;
        } else if (GlobalVariables.pendingRequiredAPICount > 0) {
            GlobalVariables.pendingRequiredAPICount--;
        }
    }
};

@Injectable({ providedIn: 'root' })
export class CustomInterceptor implements HttpInterceptor {
    constructor(
        private authAPIService: AuthAPIService,
        private authService: AuthService,
        private router: Router,
        private httpBaseService: HttpBaseService,
        private msgService: MessageService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request: HttpRequest<any>;
        const reqUrl = req.url.toLowerCase();

        // if request is not API request => stop
        if (
            !(
                reqUrl.includes(`${environment.host}${environment.prefix}`.toLowerCase()) ||
                reqUrl.includes(`${environment.authHost}${environment.authPrefix}`.toLowerCase())
            )
        ) {
            return next.handle(req);
        }

        request = req.clone({
            headers: this.addHeaders(req.headers, reqUrl)
        });

        // increase pending for required APIs, all these APIs completely => cancelable
        processPendingAPI(req, true);

        return next.handle(request).pipe(
            takeUntil(this.httpBaseService.cancelPendingRequests$),
            skip(1),
            tap((evt) => {
                processPendingAPI(req, false);
            }),
            catchError((error: HttpErrorResponse) => {
                processPendingAPI(req, false);

                if (error.status === HttpStatusCode.Unauthorized) {
                    const refresh$: Observable<any> = from(this.refreshToken());

                    return refresh$.pipe(
                        switchMap(() => {
                            request = req.clone({
                                headers: this.addHeaders(req.headers, reqUrl)
                            });

                            return next.handle(request);
                        })
                    );
                }

                return throwError(() => error);
            })
        );
    }

    refreshToken(): Promise<boolean> {
        return new Promise((resolve) => {
            this.authAPIService.refreshToken(this.authService.refreshToken).subscribe({
                next: (res) => {
                    const authResult = res.authenticationResult;

                    this.authService.refreshToken = authResult.refreshToken;
                    this.authService.accessToken = authResult.accessToken;
                    this.authService.idToken = authResult.idToken;
                    this.authService.tokenType = authResult.tokenType;

                    resolve(true);
                },
                error: (error) => {
                    /**
                     * only first refresh token API is failed and not auto signouting -> show msg
                     */
                    if (!this.authService.isAutoSignouting) {
                        // clear all data in local storage
                        this.authService.clearDataAfterSignOut();
                        // clear all current msgs, display only Refresh token error msg
                        this.msgService.clearAll();
                        // case refresh token failed => don't call API push log
                        this.msgService.error('MSG.DOC_ERR0003', {
                            accept: () => {
                                this.authService.signOut();
                            }
                        });
                    }

                    return throwError(() => error);
                }
            });
        });
    }

    private addHeaders(headers: HttpHeaders, reqUrl: string): HttpHeaders {
        const exceptedRoutes = [APIRoutes.AgreementLicense, APIRoutes.ChangeRealPW];
        if (
            (!isPublicPages(this.router) || exceptedRoutes.some((x) => reqUrl.includes(x.toLowerCase()))) &&
            (this.authService.signedIn || this.authService.tempPasswordLocal || this.authService.isExpiredPasswordLocal)
        ) {
            headers = headers.set(
                'Authorization',
                `Bearer ${
                    this.authService.signInResponseLocal?.authenticationResult?.idToken || this.authService.idToken
                }`
            );
        }

        return headers;
    }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private previousErrors: string[] = [];

    constructor(
        private msgService: MessageService,
        private loadingService: LoadingService,
        private authService: AuthService,
        private router: Router,
        private loggerService: LoggerService,
        private httpBaseService: HttpBaseService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const reqUrl = req.url.toLowerCase();
        const exceptedRoutes = [APIRoutes.Login, APIRoutes.ChangeTempPW, APIRoutes.Logout];

        /*
            in case:
                + current password is temporary
                + call API without "exceptedRoutes" API
            => stop
         */
        if (
            this.authService.tempPassword &&
            (reqUrl.includes(`${environment.host}${environment.prefix}`.toLowerCase()) ||
                reqUrl.includes(`${environment.authHost}${environment.authPrefix}`.toLowerCase())) &&
            exceptedRoutes.every((x) => !reqUrl.includes(x.toLowerCase()))
        ) {
            if (!this.loadingService.isCustomOffSetting) {
                this.loadingService.hideByZeroCount(reqUrl);
            }

            return of();
        }

        if (
            !this.loadingService.isCustomOffSetting &&
            (reqUrl.includes(`${environment.host}${environment.prefix}`.toLowerCase()) ||
                reqUrl.includes(`${environment.authHost}${environment.authPrefix}`.toLowerCase())) &&
            this.previousErrors.length === 0
        ) {
            this.loadingService.apiReqCount++;
        }

        // process API name for logger function
        let apiNameLogger = '';
        if (req.body && req.body.apiNameLogger) {
            apiNameLogger = req.body.apiNameLogger;
            delete req.body.apiNameLogger;

            if (isEmpty(req.body)) {
                (req.body as any) = null!;
            }
        }

        // increase pending for required APIs, all these APIs completely => cancelable
        processPendingAPI(req, true);

        return next.handle(req).pipe(
            timeout(60000), // 60 * 1000 => 60s
            takeUntil(this.httpBaseService.cancelPendingRequests$),
            tap((evt) => {
                processPendingAPI(req, false);
            }),
            catchError((err: any) => {
                processPendingAPI(req, false);

                // write log
                this.loggerService.error(LogType.Error, {
                    subType: LogSubType.APIError,
                    apiName: apiNameLogger,
                    errorContent: err.error.hasOwnProperty('error')
                        ? err.error.error
                        : err.error.hasOwnProperty('message')
                        ? err.error
                        : navigator.onLine
                        ? LogMessage.Unknown
                        : LogMessage.NoNetwork
                } as LogContent);

                let messageKey = this.getMessageKey(err, req);
                let showAlert = false;

                if (messageKey.length && this.previousErrors.length === 0) {
                    showAlert = true;
                    this.previousErrors.push(messageKey);
                    this.showMessage(messageKey);
                }

                return showAlert ? of(err) : throwError(() => err);
            }),
            finalize(() => {
                if (!this.loadingService.isCustomOffSetting) {
                    this.loadingService.hideByZeroCount(reqUrl);
                }
            })
        );
    }

    private getMessageKey(err: HttpErrorResponse, req: HttpRequest<any>): string {
        let key = '';

        if (!navigator.onLine) {
            key = 'MSG.DOC_ERR0004';
        } else if (err.error.hasOwnProperty('error')) {
            const errorRes = err.error.error as ErrorResponse;

            if (err.status === HttpStatusCode.BadRequest) {
                key = this.getBadRequestMessageKey(errorRes);
            }
        }

        return key;
    }

    private getBadRequestMessageKey(errRes: ErrorResponse): string {
        let key = '';

        switch (errRes.code) {
            case ErrorCode.ForceLogoutByUpdate:
            case ErrorCode.ForceLogoutByDelete:
                this.loadingService.hide();
                key = 'MSG.DOC_ERR0001';
                break;

            case ErrorCode.TempPasswordTokenExpired:
                key = 'MSG.APP_ERR0030';
                break;

            case ErrorCode.InvalidCert:
            case ErrorCode.CertExpired:
            case ErrorCode.CertRevoke:
                key = 'MSG.DOC_ERR0021';
                break;

            case ErrorCode.PasswordExpired:
            case ErrorCode.Other:
                key = 'MSG.DOC_ERR0003';
                break;

            default:
                break;
        }

        return key;
    }

    private showMessage(key: string) {
        this.msgService.error(key, {
            accept: () => {
                // remove item in array after show msg
                const index = this.previousErrors.findIndex((item) => item === key);
                if (index >= 0) {
                    this.previousErrors.splice(index, 1);
                }

                const forceLogout = [
                    'MSG.DOC_ERR0001', // Force logout by update/delete
                    'MSG.APP_ERR0030' // AccessToken expired
                ];

                /*
                    force sign out when
                    + user already signed in or changing temp password
                */
                if ((this.authService.signedIn || this.authService.tempPasswordLocal) && forceLogout.includes(key)) {
                    this.loadingService.show();
                    let isPushLog: boolean = !this.authService.tempPasswordLocal && !forceLogout.includes(key);

                    this.authService.signOut(false, isPushLog);
                } else if (key === 'MSG.DOC_ERR0021') {
                    // write log
                    this.loggerService.operation(LogType.Action, {
                        subType: LogSubType.ScreenTransition,
                        destinationScreen: LogActiveScreen.Certificate.InstallCert,
                        actualDestinationScreen: LogActiveScreen.Certificate.InstallCert
                    });

                    this.router.navigate([AppRoutes.Public, PublicLayoutRoutes.Auth, AuthRoutes.InstallCert]);
                }
            }
        } as MessageOptions);
    }
}

export const HTTP_INTERCEPTOR_PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }
];
