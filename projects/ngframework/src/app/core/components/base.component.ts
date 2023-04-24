import { Component, Inject, OnDestroy } from '@angular/core';
import { orderBy } from 'lodash';
import { Subject } from 'rxjs';

import { AppModule } from '../../app.module';
import { LogActiveScreen, LogTableIdentifier } from '../constants/log.const';
import { SortInfo } from '../models/common.model';
import { LogService } from '../services/log/log.service';

@Component({
    template: ''
})
export abstract class BaseComponent implements OnDestroy {
    destroy$ = new Subject<void>();
    sortInfo?: SortInfo;
    tableValue?: any;

    tableID: string = '';

    tableIdentifier = LogTableIdentifier;
    logActiveScreen = LogActiveScreen;

    private logService?: LogService;

    constructor(@Inject({}) private _screenName?: string, @Inject({}) private _tableID?: string) {
        try {
            this.logService = AppModule.injector.get(LogService);

            if (this._screenName) {
                this.logService!.activeScreen = _screenName;
            }

            if (this._tableID) {
                this.tableID = this._tableID;
            }
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

            if (tableWrapper && tableWrapper.length > 0) {
                // scroll table to top
                tableWrapper[0].scrollTop = 0;
            }
        } catch (error) {
            throw error;
        }
    }
}
