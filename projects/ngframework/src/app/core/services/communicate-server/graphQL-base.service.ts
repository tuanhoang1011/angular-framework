import { Injectable } from '@angular/core';
import autoBind from 'auto-bind';
import { API, graphqlOperation } from 'aws-amplify';
import { Observable, of } from 'rxjs';

import { LogMessage, LogSubType, LogType } from '../../constants/log.const';
import { LogContent } from '../../models/log.model';
import { AuthBaseService } from '../auth/auth-base.service';
import { LogService } from '../log/log.service';

@Injectable({
    providedIn: 'root'
})
export abstract class GraphQLBaseService {
    constructor(private logService: LogService, private authService: AuthBaseService) {
        autoBind(this);
    }

    async mutation<RequestType extends {}, ResponseType>(
        statement: string,
        functionName: string,
        model?: RequestType
    ): Promise<ResponseType> {
        try {
            const response = (await API.graphql(graphqlOperation(statement, model, this.authService.idToken))) as any;

            return <ResponseType>response.data;
        } catch (error) {
            this.writeLog(error, functionName);
            return new Promise((resolve) => [
                resolve(error && (error as any).errors ? (error as any).errors[0] : LogMessage.Unknown)
            ]);
        }
    }

    async query<RequestType extends {}, ResponseType>(
        statement: string,
        functionName: string,
        model?: RequestType
    ): Promise<ResponseType> {
        try {
            const response = (await API.graphql(graphqlOperation(statement, model, this.authService.idToken))) as any;

            return <ResponseType>response.data;
        } catch (error) {
            this.writeLog(error, functionName);
            return new Promise((resolve) => [
                resolve(error && (error as any).errors ? (error as any).errors[0] : LogMessage.Unknown)
            ]);
        }
    }

    subscription<RequestType extends {}, ResponseType>(
        statement: string,
        functionName: string,
        model?: RequestType
    ): Observable<ResponseType> {
        try {
            const response = API.graphql(graphqlOperation(statement, model, this.authService.idToken)) as any;

            return response as Observable<ResponseType>;
        } catch (error) {
            this.writeLog(error, functionName);
            return of(error && (error as any).errors ? (error as any).errors[0] : LogMessage.Unknown);
        }
    }

    private writeLog(err: any, functionName: string) {
        // write log
        this.logService.error(LogType.Error, {
            subType: LogSubType.APIError,
            apiName: functionName,
            errorContent:
                err.hasOwnProperty('errors') && err.errors[0].hasOwnProperty('message')
                    ? err.errors[0]
                    : navigator.onLine
                    ? LogMessage.Unknown
                    : LogMessage.NoNetwork
        } as LogContent);
    }
}
