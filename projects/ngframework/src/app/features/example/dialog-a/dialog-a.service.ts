import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GlobalState } from '../../../core/models/state.model';
import { ComponentStoreBase } from '../../../core/services/state-manager/component-store/component-store-base.service';

@Injectable({
    providedIn: 'root'
})
export class DialogAService extends ComponentStoreBase<GlobalState> {
    private readonly activeScreen$: Observable<string> = this.select((state) => state.activeScreen ?? '');
    private readonly activeDialog$: Observable<string> = this.select((state) => state.activeDialog ?? '');

    readonly vm$ = this.select(this.activeScreen$, this.activeDialog$, (activeScreen, activeDialog) => ({
        activeScreen,
        activeDialog
    }));

    constructor() {
        super({
            activeDialog: '',
            activeScreen: ''
        });
    }
}
