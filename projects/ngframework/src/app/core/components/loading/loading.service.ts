import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { LoadingState } from '../../models/state.model';
import { ComponentStoreBase } from '../../services/component-store-base.service';

@Injectable({ providedIn: 'root' })
export class LoadingService extends ComponentStoreBase<LoadingState> {
    public loadingOn$ = this.select((state) => state.loadingOn);
    public apiReqCount: number = 0;
    public isPendingAPI: boolean = false;

    constructor() {
        super({
            loadingOn: false
        });
    }

    show = (pendingAPI: boolean = true) => {
        try {
            this.updateState({
                loadingOn: true
            });

            if (!pendingAPI) {
                this.apiReqCount = 0;
                this.isPendingAPI = false;
            }
        } catch (error) {
            throw error;
        }
    };

    hide = (pendingAPI: boolean = true) => {
        try {
            if (this.apiReqCount === 0) {
                this.updateState({
                    loadingOn: false
                });
            }

            if (pendingAPI) {
                this.isPendingAPI = true;
            }
        } catch (error) {
            throw error;
        }
    };

    hideByZeroCount(reqUrl?: string) {
        try {
            // if reqURL is not API route => stop
            if (reqUrl?.includes(`${environment.apiHost}${environment.apiPrefix}`.toLowerCase())) {
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
