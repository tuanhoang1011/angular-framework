import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { MenuItem } from '../../../models/menu.model';
import { LayoutState } from '../../../models/state.model';
import { HttpBaseService } from '../../../services/communicate-server/http-base.service';
import { ComponentStoreBase } from '../../../services/state-manager/component-store/component-store-base.service';

const root = '../../../../../assets/json/';
const sidebarJSON = `${root}menu/sidebar.json`;

@Injectable({
    providedIn: 'root'
})
export class SidebarService extends ComponentStoreBase<LayoutState> {
    public readonly expandSidebar$: Observable<boolean> = this.select((state) => state.expandSidebar ?? true);

    constructor(private httpBaseService: HttpBaseService) {
        super({
            expandSidebar: true
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
