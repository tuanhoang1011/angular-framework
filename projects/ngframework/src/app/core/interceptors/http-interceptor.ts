import {
    HTTP_INTERCEPTORS,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, skip, tap, timeout } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CustomInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request: HttpRequest<any>;
        const reqUrl = req.url.toLowerCase();

        return next.handle(request!).pipe(
            skip(1),
            tap((evt) => {}),
            catchError((error: HttpErrorResponse) => {
                return throwError(() => error);
            })
        );
    }
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    private previousErrors: string[] = [];

    constructor() {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            timeout(60000), // 60 * 1000 => 60s
            tap((evt) => {}),
            finalize(() => {})
        );
    }
}

export const HTTP_INTERCEPTOR_PROVIDERS = [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CustomInterceptor, multi: true }
];
