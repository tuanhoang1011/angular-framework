import { HttpStatusCode } from '@angular/common/http';
import { ViewContainerRef } from '@angular/core';

import { BreadcrumbItemList } from './breadcrumb.model';
import { DialogInfo } from './common.model';

export interface GlobalState {
    activeScreen?: string;
    activeDialog?: string;
    errorPage?: HttpStatusCode;
    appContainerRef?: ViewContainerRef;
}

export interface LoadingState {
    loadingOn?: boolean;
    splashScreenOn?: boolean;
}

export interface LayoutState {
    expandSidebar?: boolean;
    breadcrumbs?: BreadcrumbItemList;
}

export interface DialogManagerState {
    dialogs?: DialogInfo[];
    openedDialog?: DialogInfo;
    closedDialog?: DialogInfo;
}
