import { Type } from '@angular/core';

export interface SortInfo {
    sortOrder: 'asc' | 'desc';
    sortField: string;
}

export interface DialogInfo {
    dialogId: string;
    component: Type<any>;
}
