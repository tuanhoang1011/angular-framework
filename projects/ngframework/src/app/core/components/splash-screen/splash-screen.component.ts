import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { SplashScreenService } from './splash-screen.service';

@Component({
    selector: 'app-splash-screen',
    templateUrl: './splash-screen.component.html',
    styleUrls: ['./splash-screen.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SplashScreenComponent {
    constructor(public splashScreenService: SplashScreenService) {}
}
