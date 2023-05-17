import { Injectable } from '@angular/core';

import { LoadingState } from '../../models/state.model';
import { ComponentStoreBase } from '../../services/component-store-base.service';

@Injectable({ providedIn: 'root' })
export class SplashScreenService extends ComponentStoreBase<LoadingState> {
    public splashScreenOn$ = this.select((state) => state.splashScreenOn);

    constructor() {
        super({
            splashScreenOn: true
        });
    }

    show = () => this.updateState({ splashScreenOn: true });

    hide = () => this.updateState({ splashScreenOn: false });
}
