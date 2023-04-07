import { ErrorHandler, Injectable } from '@angular/core';

import { LogSubType, LogType } from '../../constants/log.const';
import { LogContent, LogExceptionContent } from '../../models/log.model';
import { LogService } from './log.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandlerService implements ErrorHandler {
    constructor(private loggerService: LogService) {}

    handleError(error: Error) {
        if (error instanceof Error) {
            this.loggerService.error(LogType.Error, {
                subType: LogSubType.Exception,
                errorContent: {
                    message: error.message
                } as LogExceptionContent
            } as LogContent);
        }

        throw error;
    }
}

export const GLOBAL_ERROR_PROVIDERS = [{ provide: ErrorHandler, useClass: GlobalErrorHandlerService }];
