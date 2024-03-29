import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';
import { environment } from 'projects/ngframework/src/environments/environment';

import { StorageItem } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    private mainKey = environment.storage.localStorage.key;
    constructor() {}

    get(key: string): string {
        try {
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
        } catch (error) {
            throw error;
        }
    }

    set(key: string, value: string) {
        try {
            const item: StorageItem = {
                key: key,
                value: value
            };

            let objItems: Array<StorageItem> = new Array<StorageItem>();
            const storageItems: string = this.getAppCache() || '';
            if (!isEmpty(storageItems)) {
                objItems = JSON.parse(storageItems);
            }

            const existedItem = objItems.find((x) => x.key === key);
            if (existedItem) {
                // update value
                existedItem.value = value;
            } else {
                // add new
                objItems.push(item);
            }

            localStorage.setItem(this.mainKey, JSON.stringify(objItems));
        } catch (error) {
            throw error;
        }
    }

    remove(key: string) {
        try {
            const storageItems: string = this.getAppCache();

            if (!isEmpty(storageItems)) {
                const objItems: Array<StorageItem> = JSON.parse(storageItems);
                const remainItems = objItems.filter((x) => x.key !== key);

                localStorage.setItem(this.mainKey, JSON.stringify(remainItems));
            }
        } catch (error) {
            throw error;
        }
    }

    removeMulti(keys: Array<string>) {
        try {
            const storageItems: string = this.getAppCache();

            if (!isEmpty(storageItems)) {
                const objItems: Array<StorageItem> = JSON.parse(storageItems);
                const remainItems = objItems.filter((x) => keys.indexOf(x.key!) === -1);

                localStorage.setItem(this.mainKey, JSON.stringify(remainItems));
            }
        } catch (error) {
            throw error;
        }
    }

    clear() {
        try {
            localStorage.clear();
        } catch (error) {
            throw error;
        }
    }

    private getAppCache() {
        try {
            return localStorage.getItem(this.mainKey) || '';
        } catch (error) {
            throw error;
        }
    }
}
