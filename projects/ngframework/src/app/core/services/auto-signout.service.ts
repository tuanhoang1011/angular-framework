import { Injectable } from '@angular/core';
import { addMilliseconds } from 'date-fns';

import { StorageKey } from '../constants/storage-key.const';
import { GlobalVariables } from '../utils/global-variables.ultility';
import { AuthBaseService } from './auth-base.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({ providedIn: 'root' })
export class AutoSignOutService {
    private interval: any;

    constructor(private authService: AuthBaseService, private localStorageService: LocalStorageService) {}

    init() {
        this.tracker();
        this.startInterval();
    }

    private startInterval() {
        this.updateExpiredTime();
        this.interval = setInterval(async () => {
            try {
                const expiredTime = +this.localStorageService.get(StorageKey.AutoSignoutTime) ?? 0;

                // pending auto signing out when needed
                if (GlobalVariables.pendingAutoSignOut) {
                    this.updateExpiredTime();
                } else if (expiredTime < Date.now() && this.authService.isSignedInSession) {
                    const isSuccess = await this.authService.signOut();

                    if (isSuccess) {
                        this.cleanUp();
                    }
                }
            } catch (error) {
                throw error;
            }
        }, GlobalVariables.autoSignOutIntervalMilSecond);
    }

    private updateExpiredTime() {
        try {
            const newExpiredTime = addMilliseconds(
                Date.now(),
                GlobalVariables.autoSignOutDurationMinute * 60 * 1000
            ).toString();
            this.localStorageService.set(StorageKey.AutoSignoutTime, newExpiredTime);
        } catch (error) {
            throw error;
        }
    }

    private tracker() {
        try {
            window.addEventListener('click', () => this.updateExpiredTime());
            window.addEventListener('mouseover', () => this.updateExpiredTime());
            window.addEventListener('mouseout', () => this.updateExpiredTime());

            window.addEventListener('keydown', () => this.updateExpiredTime());
            window.addEventListener('keyup', () => this.updateExpiredTime());
            window.addEventListener('keypress', () => this.updateExpiredTime());

            window.addEventListener('touchstart', () => this.updateExpiredTime());
            window.addEventListener('touchmove', () => this.updateExpiredTime());
        } catch (error) {
            throw error;
        }
    }

    private cleanUp() {
        try {
            clearInterval(this.interval);
            this.localStorageService.remove(StorageKey.AutoSignoutTime);

            window.removeEventListener('click', () => this.updateExpiredTime());
            window.removeEventListener('mouseover', () => this.updateExpiredTime());
            window.removeEventListener('mouseout', () => this.updateExpiredTime());

            window.removeEventListener('keydown', () => this.updateExpiredTime());
            window.removeEventListener('keyup', () => this.updateExpiredTime());
            window.removeEventListener('keypress', () => this.updateExpiredTime());

            window.removeEventListener('touchstart', () => this.updateExpiredTime());
            window.removeEventListener('touchmove', () => this.updateExpiredTime());
        } catch (error) {
            throw error;
        }
    }
}
