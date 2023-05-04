import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LayoutState } from '../../../models/state.model';
import { ComponentStoreBase } from '../../../services/state-manager/component-store/component-store-base.service';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService extends ComponentStoreBase<LayoutState> {
    public readonly breadcrumb$: Observable<any> = this.select((state) => state.breadcrumb!);

    constructor() {
        super({
            breadcrumb: undefined
        });
    }

    setBreadcrumb(breadcrumb: any) {
        const state: LayoutState = {
            breadcrumb: breadcrumb
        };
        this.updateState(state);
    }
}
