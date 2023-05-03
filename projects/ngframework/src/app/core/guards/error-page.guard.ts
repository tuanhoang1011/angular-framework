import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LogActiveScreen, LogSubType, LogType } from '../constants/log.const';
import { AppRoutes } from '../routers/app.routes';
import { LogService } from '../services/log/log.service';
import { GlobalStateService } from '../services/state-manager/component-store/global-state.service';
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
        }

        return true;
    }
}
