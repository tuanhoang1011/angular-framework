import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { environment } from 'projects/ngframework/src/environments/environment';

import { MessageToastService } from '../../components/message-toast/message-toast.service';
import { LogLevel } from '../../constants/log.const';
import { LogContent, LogRequest } from '../../models/log.model';
import { GlobalVariables } from '../../utils/global-variables.ultility';
import { IndexedDBService } from '../storage/indexed-db.service';

@Injectable({
    providedIn: 'root'
})
export class LogService {
    public screenIdentifer = '';
    private isPushingLog: boolean = false;
    private logDB = environment?.storage.indexedDB?.log;

    constructor(private idxDBService: IndexedDBService, private msgToastService: MessageToastService) {
        this.idxDBService.createObjectStore(environment.storage.indexedDB.log.objectStore);
    }

    pushingLogs(): Promise<void> {
        return new Promise(async (resolve) => {
            const finishPushingLogs = () => {
                this.isPushingLog = false;
                resolve();
            };

            try {
                // logs are pushing -> stop
                if (this.isPushingLog) {
                    resolve();
                    return;
                }

                this.isPushingLog = true;
                const logKeys = await this.idxDBService.keys(this.logDB.objectStore);
                const logs = await this.idxDBService.get(this.logDB.objectStore, logKeys);

                if (logs.length === 0) {
                    finishPushingLogs();
                    return;
                }

                logs.forEach((log: LogRequest) => {
                    // parse obj to string
                    log.errorContent = JSON.stringify(log.errorContent);
                });

                // check later
                // this.logAPIService.pushingLogs(logs).subscribe({
                //     next: async (res) => {
                //         this.idxDBService.delete(this.logDB.objectStore, logKeys);
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
            const date = format(today, this.logDB.dateFormat ?? 'yyyyMMdd hh:mm:ss');

            await this.idxDBService.set(this.logDB.objectStore, today.toISOString(), {
                level: level,
                type: type,
                subType: log.subType,
                date: date,
                accountID: 'GUEST', // or ID of logged in account
                identifier: log.identifier,
                screen: this.screenIdentifer,
                destinationScreen: log.destinationScreen || undefined,
                apiName: log.apiName || undefined,
                errorContent: log.errorContent || undefined
            } as LogRequest);

            // push logs when log count reachs to limited record in setting
            if ((await this.idxDBService.count(this.logDB.objectStore)) >= GlobalVariables.logMaxBundleSize) {
                this.pushingLogs();
            }
        } catch (error) {
            throw error;
        }
    }
}
