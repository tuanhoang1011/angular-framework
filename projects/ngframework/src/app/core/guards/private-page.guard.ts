import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { LogActiveScreen, LogSubType, LogType } from '../constants/log.const';
import { AppRoutes } from '../constants/router.const';
import { AuthService } from '../services/auth.service';
import { LogService } from '../services/log.service';

@Injectable({ providedIn: 'root' })
export class PrivatePageGuard {
    constructor(private authService: AuthService, private logService: LogService) {}

    canActivate(route: ActivatedRouteSnapshot) {
        if (!this.authService.isSignedInSession) {
            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.ScreenTransition,
                destinationScreen: LogActiveScreen.SignIn
            });

            window.location.href = `/${AppRoutes.Public}`;

            return false;
        }

        return true;
    }
}
