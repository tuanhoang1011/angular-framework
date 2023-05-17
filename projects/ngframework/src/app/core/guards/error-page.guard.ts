import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LogActiveScreen, LogSubType, LogType } from '../constants/log.const';
import { AppRoutes } from '../constants/router.const';
import { GlobalStateService } from '../services/global-state.service';
import { LogService } from '../services/log.service';
import { isNullOrUndefined } from '../utils/common-func.ultility';

@Injectable({ providedIn: 'root' })
export class ErrorPageGuard {
    constructor(
        private globalStateService: GlobalStateService,
        private router: Router,
        private logService: LogService
    ) {}

    canActivate() {
        if (isNullOrUndefined(this.globalStateService.getStates.errorPage)) {
            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.ScreenTransition,
                destinationScreen: LogActiveScreen.Home
            });

            this.router.navigate([AppRoutes.Public]);

            return false;
        } else {
            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.ScreenTransition,
                destinationScreen: LogActiveScreen.ErrorPage
            });

            return true;
        }
    }
}
