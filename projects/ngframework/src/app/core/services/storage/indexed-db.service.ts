import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';

import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class IndexedDBService {
    dbPromise!: Promise<IDBPDatabase<object>>;

    constructor() {}

    async createObjectStore(objStore: string) {
        return (this.dbPromise = openDB<object>(environment?.storage.indexedDB.db, 1, {
            upgrade(db) {
                db.createObjectStore(objStore);
            }
        }));
    }

    async deleteObjectStore(objStore: string) {
        return (this.dbPromise = openDB<object>(environment?.storage.indexedDB.db, 1, {
            upgrade(db) {
                db.deleteObjectStore(objStore);
            }
        }));
    }

    async getAll(objStore: string) {
        return (await this.dbPromise).getAll(objStore);
    }

    async get(objStore: string, key: IDBKeyRange | IDBValidKey) {
        return (await this.dbPromise).get(objStore, key);
    }

    async set(objStore: string, key: IDBKeyRange | IDBValidKey, val: any) {
        return (await this.dbPromise).put(objStore, val, key);
    }

    async delete(objStore: string, key: IDBKeyRange | IDBValidKey) {
        return (await this.dbPromise).delete(objStore, key);
    }

    async clear(objStore: string) {
        return (await this.dbPromise).clear(objStore);
    }

    async keys(objStore: string) {
        return (await this.dbPromise).getAllKeys(objStore);
    }

    async count(objStore: string) {
        return (await this.dbPromise).count(objStore);
    }
}
