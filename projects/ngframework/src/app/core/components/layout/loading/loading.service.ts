import { Injectable } from '@angular/core';
import { environment } from 'projects/ngframework/src/environments/environment';

import { LoadingState } from '../../../models/state.model';
import { ComponentStoreBase } from '../../../services/state-manager/component-store/component-store-base.service';

@Injectable({ providedIn: 'root' })
export class LoadingService extends ComponentStoreBase<LoadingState> {
    public loading$ = this.select((state) => state.loading);
    public apiReqCount: number = 0;
    public isPendingAPI: boolean = false;

    constructor() {
        super({
            loading: false
        });
    }

    show = (isPendingAPI: boolean = true) => {
        try {
            this.updateState({
                loading: true
            });

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
                this.updateState({
                    loading: false
                });
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
