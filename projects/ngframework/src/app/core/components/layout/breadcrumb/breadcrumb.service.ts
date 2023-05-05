import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BreadcrumbItemList } from '../../../models/breadcrumb.model';
import { LayoutState } from '../../../models/state.model';
import { ComponentStoreBase } from '../../../services/state-manager/component-store/component-store-base.service';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService extends ComponentStoreBase<LayoutState> {
    public readonly breadcrumb$: Observable<BreadcrumbItemList> = this.select((state) => state.breadcrumbs!);

    constructor() {
        super({
            breadcrumbs: undefined
        });
    }

    setBreadcrumb(breadcrumbs: BreadcrumbItemList) {
        const state: LayoutState = {
            breadcrumbs: breadcrumbs
        };
        this.updateState(state);
    }
}
