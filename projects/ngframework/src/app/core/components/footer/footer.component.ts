import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { CommonConstant } from '../../constants/common.const';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent extends BaseComponent {
    constant = CommonConstant;

    constructor() {
        super();
    }
}
