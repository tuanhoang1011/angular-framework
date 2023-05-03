import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseComponent } from '../../base.component';
import { SplashScreenService } from '../../splash-screen/splash-screen.service';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicComponent extends BaseComponent {
    constructor(public splashScreenService: SplashScreenService) {
        super();
       }
}
