import { Injectable } from '@angular/core';

import { LoadingState } from '../../models/state.model';
import { ComponentStoreBase } from '../../services/state-manager/component-store/component-store-base.service';

@Injectable({ providedIn: 'root' })
export class SplashScreenService extends ComponentStoreBase<LoadingState> {
    public splashScreen$ = this.select((state) => state.splashScreen);

    constructor() {
        super({
            splashScreen: true
        });
    }

    show = () => this.updateState({ splashScreen: true });

    hide = () => this.updateState({ splashScreen: false });
}
