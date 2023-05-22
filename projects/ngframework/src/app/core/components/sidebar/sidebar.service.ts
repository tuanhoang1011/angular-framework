import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { MenuItem } from '../../models/item.model';
import { LayoutState } from '../../models/state.model';
import { ComponentStoreBase } from '../../services/component-store-base.service';
import { HttpBaseService } from '../../services/http-base.service';
import { GlobalVariables } from '../../utils/global-variables.ultility';

const root = '../../../../../assets/json/';
const sidebarJSON = `${root}items/sidebar.json`;

@Injectable({
    providedIn: 'root'
})
export class SidebarService extends ComponentStoreBase<LayoutState> {
    public readonly expandSidebar$: Observable<boolean> = this.select((state) => state.expandSidebar ?? true);

    constructor(private httpBaseService: HttpBaseService) {
        super({
            expandSidebar: window.innerWidth >= GlobalVariables.standardSize.lg
        });
    }

    async getNavMenu() {
        return await lastValueFrom<{ menu: MenuItem[] }>(this.httpBaseService.getLocalFile(sidebarJSON));
    }

    setSidebarStatus(val: boolean) {
        const state: LayoutState = {
            expandSidebar: val ?? true
        };
        this.updateState(state);
    }
}
