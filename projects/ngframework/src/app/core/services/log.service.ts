import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { isEmpty } from 'lodash';

import { environment } from '../../../environments/environment';
import { MessageToastService } from '../components/message-toast/message-toast.service';
import { LogLevel } from '../constants/log.const';
import { LogContent, LogRequest } from '../models/log.model';
import { GlobalVariables } from '../utils/global-variables.ultility';
import { GlobalStateService } from './global-state.service';
import { IndexedDBService } from './indexed-db.service';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    public screenIdentifer = '';
    private isPushingLog: boolean = false;
    private pendingKey: IDBValidKey = '';

    private logDB = {
        ...environment?.storage.indexedDB?.log,
        maxBundleSize: GlobalVariables.logMaxBundleSize
    };

    constructor(
        private idxDBService: IndexedDBService,
        private msgToastService: MessageToastService,
        private globalStateService: GlobalStateService
    ) {
        this.idxDBService.createObjectStore(this.logDB.objectStore);
        this.listenState();
    }

    private listenState() {
        this.globalStateService.vm$.subscribe((res) => {
            try {
                // set active screen/dialog for writing log
                this.screenIdentifer = res.activeDialog || res.activeScreen;
            } catch (error) {
                throw error;
            }
        });
    }

    pushingLogs(): Promise<void> {
        return new Promise(async (resolve) => {
            const finishPushingLogs = () => {
                this.isPushingLog = false;
                this.pendingKey = '';
                resolve();
            };

            try {
                // logs are pushing -> stop
                if (this.isPushingLog) {
                    resolve();
                    return;
                }

                this.isPushingLog = true;

                // don't get and push log bundles which are created from the start of calling pushingLogs until the end of pushingLogs
                let keys = (await this.idxDBService.keys(this.logDB.objectStore)) ?? [];
                keys = keys.filter((key) => key !== this.pendingKey);
                let totalLogs: LogRequest[] = [];

                for (let i = 0; i < keys.length; i++) {
                    const logs = ((await this.idxDBService.get(this.logDB.objectStore, keys[i])) as LogRequest[]) ?? [];
                    totalLogs = [...totalLogs, ...logs];
                }

                if (totalLogs.length === 0) {
                    finishPushingLogs();
                    return;
                }

                totalLogs.forEach((log: LogRequest) => {
                    // parse obj to string
                    log.errorContent = JSON.stringify(log.errorContent);
                });

                // remove later
                setTimeout(async () => {
                    for (let i = 0; i < keys.length; i++) {
                        await this.idxDBService.remove(this.logDB.objectStore, keys[i]);
                    }
                    finishPushingLogs();
                }, 3000);

                // check later
                // this.logAPIService.pushingLogs(totalLogs).subscribe({
                //     next: async (res) => {
                // for (let i = 0; i < keys.length; i++) {
                //     await this.idxDBService.remove(this.logDB.objectStore, keys[i]);
                // }
                // finishPushingLogs();
                //     },
                //     error: (err) => {
                //         if (err instanceof HttpErrorResponse) {
                //             this.msgService.error('MSG.APP_ERR0001');
                //             finishPushingLogs();
                //         }
                //     }
                // });
            } catch (error) {
                // this.msgService.error('MSG.APP_ERR0001');
                finishPushingLogs();

                throw error;
            }
        });
    }

    error(type: string, log: LogContent) {
        this.writeLog(LogLevel.Error, type, log);
    }

    operation(type: string, log: LogContent) {
        this.writeLog(LogLevel.Operation, type, log);
    }

    info(type: string, log: LogContent) {
        this.writeLog(LogLevel.Info, type, log);
    }

    debug(type: string, log: LogContent) {
        this.writeLog(LogLevel.Debug, type, log);
    }

    warn(type: string, log: LogContent) {
        this.writeLog(LogLevel.Warn, type, log);
    }

    private async writeLog(level: string, type: string, log: LogContent) {
        try {
            if (!log || !this.logDB.levels?.includes(level)) {
                return Promise.resolve();
            }

            const today = new Date();
            let key: IDBValidKey = '';

            /**
             * in case system is pushing logs
             * always add new logs into newest created bundle
             * -> this bundle will be ignore in pushing logs processing
             */
            if (this.isPushingLog) {
                key = this.pendingKey || `bundle-${today.toISOString()}`;
                this.pendingKey = key;
            } else {
                const keys = await this.idxDBService.keys(this.logDB.objectStore);

                if (isEmpty(keys)) {
                    key = `bundle-${today.toISOString()}`;
                } else {
                    /**
                     * system may have multiple log bundles but only first bundle has most log
                     * -> always get first bundle in order to compare with logMaxBundleSize
                     */
                    key = keys.shift()!;
                }
            }

            const newLog: LogRequest = {
                level: level,
                type: type,
                subType: log.subType,
                date: format(today, this.logDB.dateFormat ?? 'yyyyMMdd hh:mm:ss'),
                accountID: 'GUEST', // or ID of logged in account
                identifier: log.identifier,
                screen: this.screenIdentifer,
                destinationScreen: log.destinationScreen || undefined,
                apiName: log.apiName || undefined,
                errorContent: log.errorContent || undefined
            };
            let logBundle: LogRequest[] = [];
            logBundle = ((await this.idxDBService.get(this.logDB.objectStore, key)) as LogRequest[]) ?? [];
            logBundle.push(newLog);

            await this.idxDBService.set(this.logDB.objectStore, key, logBundle);

            // logBundle is always first bundle which has most logs -> use it to compare with logMaxBundleSize
            if (logBundle.length >= this.logDB.maxBundleSize) {
                this.pushingLogs();
            }
        } catch (error) {
            throw error;
        }
    }
}
