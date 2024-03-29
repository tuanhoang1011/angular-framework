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
import { isEmpty } from 'lodash';
import { Observable, of } from 'rxjs';
import { catchError, finalize, skip, switchMap, takeUntil, timeout } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { AuthAPIService } from '../../network-service/api/auth-api.service';
import { LoadingService } from '../components/loading/loading.service';
import { MessageToastService } from '../components/message-toast/message-toast.service';
import { LogMessage, LogSubType, LogType } from '../constants/log.const';
import { ErrorResponse } from '../models/http-response.model';
import { LogContent } from '../models/log.model';
import { GlobalVariables } from '../utils/global-variables.ultility';
import { AuthService } from './auth.service';
import { GlobalStateService } from './global-state.service';
import { HttpBaseService } from './http-base.service';
import { LogService } from './log.service';

@Injectable({ providedIn: 'root' })
export class CustomInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private httpBaseService: HttpBaseService,
        private authAPIService: AuthAPIService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            let request: HttpRequest<any>;
            const reqUrl = req.url.toLowerCase();

            // not API request => stop
            if (!reqUrl.includes(`${environment.apiHost}/${environment.apiPrefix}`.toLowerCase())) {
                return next.handle(req);
            }

            request = req.clone({
                headers: this.addHeaders(req.headers, reqUrl)
            });

            return next.handle(request).pipe(
                takeUntil(this.httpBaseService.cancelPendingRequests$),
                skip(1),
                catchError((err) => {
                    try {
                        if (err.status === HttpStatusCode.Unauthorized) {
                            // refresh token and then sent request again
                            return this.authAPIService.refreshToken(this.authService.refreshToken).pipe(
                                switchMap((res) => {
                                    try {
                                        this.authService.idToken = res.idToken!;
                                        this.authService.refreshToken = res.refreshToken!;

                                        request = req.clone({
                                            headers: this.addHeaders(req.headers, reqUrl)
                                        });

                                        return next.handle(request);
                                    } catch (error) {
                                        throw error;
                                    }
                                })
                            );
                        }

                        return of(err);
                    } catch (error) {
                        throw error;
                    }
                })
            );
        } catch (error) {
            throw error;
        }
    }

    private addHeaders(headers: HttpHeaders, reqUrl: string): HttpHeaders {
        try {
            const noHeaderRoutes = [];

            if (noHeaderRoutes.some((url: string) => reqUrl.includes(url.toLowerCase()))) {
                return headers;
            }

            return (headers = headers.set('Authorization', `Bearer ${this.authService.idToken}`));
        } catch (error) {
            throw error;
        }
    }
}

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private logService: LogService,
        private msgToastService: MessageToastService,
        private loadingService: LoadingService,
        private httpBaseService: HttpBaseService,
        private globalStateService: GlobalStateService
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        try {
            const reqUrl = req.url.toLowerCase();

            if (reqUrl.includes(`${environment.apiHost}/${environment.apiPrefix}`.toLowerCase())) {
                this.loadingService.apiReqCount++;
            }

            // process API name for log writting
            let apiName = '';
            if (req.body && req.body.apiName) {
                apiName = req.body.apiName;
                delete req.body.apiName;

                if (isEmpty(req.body)) {
                    (req.body as any) = null!;
                }
            }

            return next.handle(req).pipe(
                timeout(GlobalVariables.requestHTTPTimeoutMilSecond),
                takeUntil(this.httpBaseService.cancelPendingRequests$),
                catchError((err) => {
                    try {
                        // write log
                        this.logService.error(LogType.Error, {
                            subType: LogSubType.APIError,
                            apiName: apiName,
                            errorContent: err.error.hasOwnProperty('error')
                                ? err.error.error
                                : err.error.hasOwnProperty('message')
                                ? err.error
                                : navigator.onLine
                                ? LogMessage.Unknown
                                : LogMessage.NoNetwork
                        } as LogContent);

                        switch (err.status) {
                            case HttpStatusCode.BadRequest:
                            case HttpStatusCode.Forbidden:
                            case HttpStatusCode.NotFound:
                            case HttpStatusCode.InternalServerError:
                                this.globalStateService.setErrorPage(err.status);
                                return of(err);

                            default:
                                let msgKey = this.getMessageKey(err, req);
                                this.showMessage(msgKey);
                                return of(err);
                        }
                    } catch (error) {
                        throw error;
                    }
                }),
                finalize(() => {
                    if (this.loadingService.isPendingAPI) {
                        this.loadingService.hideByZeroCount(reqUrl);
                    }
                })
            );
        } catch (error) {
            throw error;
        }
    }

    private getMessageKey(err: HttpErrorResponse, req: HttpRequest<any>): string {
        try {
            let key = '';

            if (!navigator.onLine) {
                key = 'MSG.APP_ERR0002';
            } else if (err.error.hasOwnProperty('error')) {
                const errorRes = err.error.error as ErrorResponse;

                key = 'MSG.APP_ERR0001';
            }

            return key;
        } catch (error) {
            throw error;
        }
    }

    private showMessage(key: string) {
        try {
            this.msgToastService.error(key);

            const forceLogout: string[] = [];
            /*
                force sign out when
                + user already signed in
            */
            if (this.authService.isSignedInSession && forceLogout.includes(key)) {
                this.loadingService.show();
                this.authService.signOut();
            }
        } catch (error) {
            throw error;
        }
    }
}

export const HTTP_INTERCEPTORS_PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }
];
