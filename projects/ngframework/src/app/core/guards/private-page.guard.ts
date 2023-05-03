import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { LogActiveScreen, LogSubType, LogType } from '../constants/log.const';
import { AppRoutes } from '../routers/app.routes';
import { AuthBaseService } from '../services/auth/auth-base.service';
import { LogService } from '../services/log/log.service';

@Injectable({ providedIn: 'root' })
export class PrivatePageGuard {
    constructor(private authService: AuthBaseService, private logService: LogService) {}

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