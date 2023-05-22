import { Component, EventEmitter, Inject, Input, OnDestroy, Output } from '@angular/core';
import { isEmpty, orderBy } from 'lodash';
import { Subject } from 'rxjs';

import { AppModule } from '../../app.module';
import { SortInfo } from '../models/common.model';
import { GlobalStateService } from '../services/global-state.service';

@Component({
    template: ''
})
export abstract class BaseComponent implements OnDestroy {
    @Input() isVisible: boolean = true;
    @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    destroy$ = new Subject<void>();
    sortInfo?: SortInfo;
    tableValue?: any;

    tableID: string = '';

    constructor(
        @Inject({}) private _activeScreen?: string,
        @Inject({}) private _activeDialog?: string,
        @Inject({}) private _tableID?: string
    ) {
        try {
            // set screen identifer for writing log when access pages
            if (this._activeScreen) AppModule.injector.get(GlobalStateService).setActiveScreen(this._activeScreen);
            if (this._activeDialog) {
                setTimeout(() => {
                    AppModule.injector.get(GlobalStateService).setActiveDialog(this._activeDialog!);
                }, 200);
            }
            if (this._tableID) this.tableID = this._tableID;
        } catch (error) {
            throw error;
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }

    onSort(event: any) {
        try {
            this.sortInfo = {
                sortOrder: event.orderStr,
                sortField: event.field
            };

            this.executeSort();
        } catch (error) {
            throw error;
        }
    }

    executeSort() {
        try {
            this.tableValue = orderBy(this.tableValue, [this.sortInfo?.sortField], [this.sortInfo?.sortOrder ?? 'asc']);
        } catch (error) {
            throw error;
        }
    }

    scrollTableToTop() {
        try {
            const tableWrapper = document.querySelectorAll(`#${this.tableID} .p-datatable-wrapper`);

            if (!isEmpty(tableWrapper)) {
                // scroll table to top
                tableWrapper[0].scrollTop = 0;
            }
        } catch (error) {
            throw error;
        }
    }
}
