import { HttpStatusCode } from '@angular/common/http';
import { Injectable, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AppRoutes } from '../constants/router.const';
import { GlobalState } from '../models/state.model';
import { isNullOrUndefined } from '../utils/common-func.ultility';
import { ComponentStoreBase } from './component-store-base.service';

@Injectable({ providedIn: 'root' })
export class GlobalStateService extends ComponentStoreBase<GlobalState> {
    private readonly activeScreen$: Observable<string> = this.select((state) => state.activeScreen ?? '');
    private readonly activeDialog$: Observable<string> = this.select((state) => state.activeDialog ?? '');

    readonly vm$ = this.select(this.activeScreen$, this.activeDialog$, (activeScreen, activeDialog) => ({
        activeScreen,
        activeDialog
    }));

    constructor(private router: Router) {
        super({
            activeScreen: '',
            activeDialog: ''
        });
    }

    setActiveScreen(val: string) {
        const state: GlobalState = {
            activeScreen: val
        };
        this.updateState(state);
    }

    setActiveDialog(val: string) {
        const state: GlobalState = {
            activeDialog: val
        };
        this.updateState(state);
    }

    setErrorPage(code?: HttpStatusCode) {
        const state: GlobalState = {
            errorPage: code
        };
        this.updateState(state);

        if (!isNullOrUndefined(code)) {
            this.router.navigate([AppRoutes.Error, `${code}`]);
        }
    }

    setAppContainerRef(ref: ViewContainerRef) {
        const state: GlobalState = {
            appContainerRef: ref
        };
        this.updateState(state);
    }
}
