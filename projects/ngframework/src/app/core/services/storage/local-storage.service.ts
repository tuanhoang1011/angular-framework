import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';
import { environment } from 'projects/ngframework/src/environments/environment';

import { StorageItem } from '../../models/storage-item.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    mainKey = environment.storage.localStorage.key;
    constructor() {}

    get(key: string): string {
        const storageItems: string = this.getAppCache();
        let val = '';

        if (isEmpty(storageItems)) {
            return val;
        } else {
            const items: Array<StorageItem> = JSON.parse(storageItems);
            const existedItem = items.find((x) => x.key === key);

            if (existedItem) {
                val = existedItem.value!;
            }

            return val;
        }
    }

    set(key: string, value: string) {
        const item: StorageItem = {
            key: key,
            value: value
        };

        let objItems: Array<StorageItem> = new Array<StorageItem>();
        const storageItems: string = this.getAppCache();
        const existedItem = objItems.find((x) => x.key === key);

        if (existedItem) {
            // update value
            existedItem.value = value;
        } else {
            // add new
            objItems = JSON.parse(storageItems);
            objItems.push(item);
        }

        localStorage.setItem(this.mainKey, JSON.stringify(objItems));
    }

    removeItem(key: string) {
        const storageItems: string = this.getAppCache();

        if (!isEmpty(storageItems)) {
            const objItems: Array<StorageItem> = JSON.parse(storageItems);
            const remainItems = objItems.filter((x) => x.key !== key);

            localStorage.setItem(this.mainKey, JSON.stringify(remainItems));
        }
    }

    removeItems(keys: Array<string>) {
        const storageItems: string = this.getAppCache();

        if (!isEmpty(storageItems)) {
            const objItems: Array<StorageItem> = JSON.parse(storageItems);
            const remainItems = objItems.filter((x) => keys.indexOf(x.key!) === -1);

            localStorage.setItem(this.mainKey, JSON.stringify(remainItems));
        }
    }

    clear() {
        localStorage.clear();
    }

    private getAppCache() {
        return localStorage.getItem(this.mainKey) || '';
    }
}
