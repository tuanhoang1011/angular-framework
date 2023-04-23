import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { LoadingService } from './loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class LoadingComponent {
    constructor(public loadingService: LoadingService) {}
}
