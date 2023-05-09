import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SplashScreenService } from './splash-screen.service';

@Component({
    selector: 'app-splash-screen',
    templateUrl: './splash-screen.component.html',
    styleUrls: ['./splash-screen.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashScreenComponent {
    constructor(public splashScreenService: SplashScreenService) {}
}
