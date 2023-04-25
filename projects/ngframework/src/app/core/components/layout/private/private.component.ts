import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { BaseComponent } from '../../base.component';

@Component({
    selector: 'app-private',
    templateUrl: './private.component.html',
    styleUrls: ['./private.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateComponent extends BaseComponent {
    constructor() {
        super();
    }
}
