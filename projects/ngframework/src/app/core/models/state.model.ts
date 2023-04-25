import { HttpStatusCode } from '@angular/common/http';
import { ViewContainerRef } from '@angular/core';

import { DialogInfo } from './common.model';

export interface GlobalState {
    activeScreen?: string;
    activeDialog?: string;
    errorPage?: HttpStatusCode;
    appContainerRef?: ViewContainerRef;
}

export interface LoadingState {
    loading?: boolean;
    splashScreen?: boolean;
}

export interface DialogManagerState {
    dialogs?: DialogInfo[];
    openedDialog?: DialogInfo;
    closedDialog?: DialogInfo;
}
