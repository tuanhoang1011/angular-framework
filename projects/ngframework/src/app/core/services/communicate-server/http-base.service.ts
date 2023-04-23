import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import autoBind from 'auto-bind';
import { keys } from 'lodash';
import { environment } from 'projects/ngframework/src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { AppModule } from '../../../app.module';

export type HttpMethod = 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH';

export interface Options {
    prefix?: string;
    baseUrl?: string;
    body?: any;
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };
    params?: HttpParams | any;
    context?: HttpContext;
    observe?: 'body';
    responseType?: 'json';
    reportProgress?: boolean;
    withCredentials?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export abstract class HttpBaseService {
    httpClient: HttpClient;
    cancelPendingRequestsSource = new Subject<void>();
    cancelPendingRequests$ = this.cancelPendingRequestsSource.asObservable();

    constructor() {
        this.httpClient = AppModule.injector.get(HttpClient);
        autoBind(this);
    }

    cancelPendingRequests() {
        this.cancelPendingRequestsSource.next();
    }

    request<ResponseType>(
        method: HttpMethod,
        url: string,
        apiName: string,
        options?: Options
    ): Observable<ResponseType> {
        try {
            // set API name for write log function
            options = {
                ...options,
                body: {
                    apiName: apiName
                } as any
            };

            // remove params which are undefined
            if (options?.params) {
                Object.keys(options?.params).forEach((x) => {
                    if (options?.params[x] === 'undefined') {
                        delete options?.params[x];
                    }
                });
            }

            return this.httpClient!.request<ResponseType>(method, url, options);
        } catch (error) {
            throw error;
        }
    }

    get<RequestType, ResponseType>(url: string, apiName: string, params?: RequestType): Observable<ResponseType> {
        if (params) {
            this.enCodeURI<RequestType>(params);
        }

        return this.request<ResponseType>('GET', url, apiName, {
            params
        });
    }

    delete<RequestType, ResponseType>(url: string, apiName: string, params?: RequestType): Observable<ResponseType> {
        if (params) {
            this.enCodeURI<RequestType>(params);
        }

        return this.request<ResponseType>('DELETE', url, apiName, {
            params
        });
    }

    options<RequestType, ResponseType>(url: string, apiName: string, params?: RequestType): Observable<ResponseType> {
        if (params) {
            this.enCodeURI<RequestType>(params);
        }

        return this.request<ResponseType>('OPTIONS', url, apiName, {
            params
        });
    }

    post<RequestType, ResponseType>(url: string, apiName: string, body?: RequestType): Observable<ResponseType> {
        return this.request<ResponseType>('POST', url, apiName, {
            body
        });
    }

    put<RequestType, ResponseType>(url: string, apiName: string, body?: RequestType): Observable<ResponseType> {
        return this.request<ResponseType>('PUT', url, apiName, {
            body
        });
    }

    patch<RequestType, ResponseType>(url: string, apiName: string, body?: RequestType): Observable<ResponseType> {
        return this.request<ResponseType>('PATCH', url, apiName, {
            body
        });
    }

    getLocalFile<ResponseType>(url: string): Observable<ResponseType> {
        return this.httpClient!.request<ResponseType>('GET', url);
    }

    private enCodeURI<T>(params: T) {
        try {
            keys(params).forEach((key) => {
                params[key] = encodeURIComponent(params[key]);
            });

            return params;
        } catch (error) {
            throw error;
        }
    }

    private getURL(apiRoute: string): string {
        try {
            const result = new URL(`${environment.prefix}${apiRoute}`, environment.host);

            return result.href;
        } catch (error) {
            throw error;
        }
    }
}
