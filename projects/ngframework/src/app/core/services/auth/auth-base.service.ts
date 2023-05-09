import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';
import { assignIn, cloneDeep } from 'lodash';

import { AuthAPIService } from '../../../network-service/api/auth-api.service';
import { LoadingService } from '../../components/layout/loading/loading.service';
import { MessageToastService } from '../../components/message-toast/message-toast.service';
import { StorageKey } from '../../constants/storage-key.const';
import { ErrorCode } from '../../enums/server-error-code.enum';
import { SignInRequest, SignInResponse, UserProfileResponse } from '../../models/auth.model';
import { ErrorResponse } from '../../models/http-response.model';
import { AppRoutes } from '../../routers/app.routes';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthBaseService {
    signedOutCurrentTab = true;

    set isSignedInSession(value: boolean) {
        this.localStorageService.set(StorageKey.SignInState, value ? '1' : '0');
    }
    get isSignedInSession(): boolean {
        return this.localStorageService.get(StorageKey.SignInState) === '1';
    }

    set isSignedOutSession(value: boolean) {
        this.localStorageService.set(StorageKey.SignOutState, value ? '1' : '0');
    }
    get isSignedOutSession(): boolean {
        return this.localStorageService.get(StorageKey.SignOutState) === '1';
    }

    set expiresIn(value: number) {
        this.localStorageService.set(StorageKey.AuthExpiredTime, value.toString());
    }
    get expiresIn(): number {
        try {
            if (!this.isSignedInSession) {
                return 0;
            }

            return parseInt(this.localStorageService.get(StorageKey.AuthExpiredTime), 10);
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    set userProfile(value: UserProfileResponse) {
        this.localStorageService.set(StorageKey.UserProfile, JSON.stringify(value));
    }
    get userProfile(): UserProfileResponse {
        try {
            if (!this.isSignedInSession) {
                return { profile: {} };
            }

            return JSON.parse(this.localStorageService.get(StorageKey.UserProfile)) as UserProfileResponse;
        } catch (error) {
            console.error(error);
            return { profile: {} };
        }
    }

    set idToken(value: string) {
        this.localStorageService.set(StorageKey.IdToken, value);
    }
    get idToken(): string {
        if (!this.isSignedInSession) {
            return '';
        }

        return this.localStorageService.get(StorageKey.IdToken);
    }

    set refreshToken(value: string) {
        this.localStorageService.set(StorageKey.RefreshToken, value);
    }
    get refreshToken(): string {
        if (!this.isSignedInSession) {
            return '';
        }

        return this.localStorageService.get(StorageKey.RefreshToken);
    }

    set isExpiredPassword(value: boolean) {
        this.localStorageService.set(StorageKey.ExpiredPasswordState, value ? '1' : '0');
    }
    get isExpiredPassword(): boolean {
        return this.localStorageService.get(StorageKey.ExpiredPasswordState) === '1';
    }

    set isAutoSignOut(value: boolean) {
        this.localStorageService.set(StorageKey.AutoSignOutState, value ? '1' : '0');
    }
    get isAutoSignOut(): boolean {
        return this.localStorageService.get(StorageKey.AutoSignOutState) === '1';
    }

    constructor(
        private localStorageService: LocalStorageService,
        private authAPIService: AuthAPIService,
        private msgToastService: MessageToastService,
        private loadingService: LoadingService
    ) {}

    getUserProfile = this.authAPIService.getUserProfile;

    async signIn(model: SignInRequest, cdr: ChangeDetectorRef) {
        try {
            this.authAPIService.signIn(model).subscribe({
                next: async (res) => {
                    // clear auto sign out state in local storage
                    this.isAutoSignOut = false;

                    const isDone = await this.processAfterSignIn(res, model.username);

                    if (isDone) {
                        const dayDuration = differenceInCalendarDays(res.passwordExpireDate as Date, new Date());

                        // case real password is about to expire or expired
                        if (dayDuration <= 15) {
                            let isExprired = dayDuration <= 0;

                            this.isExpiredPassword = true;

                            // case real password is about to expire
                            if (isExprired) {
                                this.clearDataAfterSignOut();
                            } else {
                            }

                            return;
                        }
                    }
                },
                error: (err) => {
                    if (err instanceof HttpErrorResponse) {
                        let msg = 'MSG.APP_ERR0001';

                        if (err.error.hasOwnProperty('error')) {
                            const errorRes = err.error.error as ErrorResponse;

                            // wrong user name or password
                            if (errorRes.code === ErrorCode.UserNamePasswordWrong) {
                                msg = 'MSG.APP_ERR0004';
                            }
                        }

                        this.msgToastService.error(msg);
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }

    processAfterSignIn(res: SignInResponse, username?: string): Promise<boolean> {
        return new Promise((resolve) => {
            const expiresIn = new Date().getTime() / 1000 + res.expiresIn!;

            this.idToken = res.idToken!;
            this.refreshToken = res.refreshToken!;
            this.expiresIn = parseInt(expiresIn, 10);
            this.isSignedInSession = true;
            this.isSignedOutSession = this.signedOutCurrentTab = false;

            resolve(true);
        });
    }

    setProfileData(res: UserProfileResponse) {
        const userProfile = this.userProfile;

        assignIn(userProfile, res);
        this.userProfile = userProfile;
    }

    signOut(): Promise<boolean> {
        try {
            return new Promise((resolve) => {
                this.loadingService.show(true);
                this.authAPIService.signOut().subscribe({
                    next: () => {
                        this.clearDataAfterSignOut();
                        this.loadingService.hide(true);
                        resolve(true);

                        window.location.href = `/${AppRoutes.Public}`;
                    },
                    error: () => {
                        this.loadingService.hide(true);
                        resolve(false);
                    }
                });
            });
        } catch (error) {
            throw error;
        }
    }

    clearDataAfterSignOut(): void {
        const unclearItems = [
            {
                key: StorageKey.CurrentRoute,
                value: cloneDeep(this.localStorageService.get(StorageKey.CurrentRoute))
            }
        ];
        this.localStorageService.clear();
        unclearItems.forEach((x) => this.localStorageService.set(x.key, x.value));

        this.isSignedOutSession = this.signedOutCurrentTab = true;
        this.isSignedInSession = false;
        this.isExpiredPassword = false;
    }
}
