import { Injectable } from '@angular/core';
import { environment } from 'projects/ngframework/src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    public apiReqCount: number = 0;
    public isShown: boolean = false;
    public isPendingAPI: boolean = false;

    public loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor() {
        this.loading$.subscribe((isShown) => {
            this.isShown = isShown;
        });
    }

    show = (isPendingAPI: boolean = true) => {
        try {
            this.loadingSubject.next(true);

            if (!isPendingAPI) {
                this.apiReqCount = 0;
                this.isPendingAPI = false;
            }
        } catch (error) {
            throw error;
        }
    };

    hide = (isPendingAPI: boolean = true) => {
        try {
            if (this.apiReqCount === 0) {
                this.loadingSubject.next(false);
            }

            if (isPendingAPI) {
                this.isPendingAPI = true;
            }
        } catch (error) {
            throw error;
        }
    };

    hideByZeroCount(reqUrl?: string) {
        try {
            // if reqURL is not API route => stop
            if (reqUrl?.includes(`${environment.host}${environment.prefix}`.toLowerCase())) {
                if (this.apiReqCount > 0) {
                    this.apiReqCount--;
                }

                if (this.apiReqCount === 0) {
                    this.hide();
                }
            }
        } catch (error) {
            throw error;
        }
    }
}
