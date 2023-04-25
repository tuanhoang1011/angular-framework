import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseComponent } from '../../../core/components/base.component';

@Component({
    selector: 'app-dialog-b',
    templateUrl: './dialog-b.component.html',
    styleUrls: ['./dialog-b.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogBComponent extends BaseComponent {
    @Input() data: any;

    constructor(private translateService: TranslateService) {
        super('Dialog B');
    }

    close() {
        console.log('Clase dialog B');
    }

    clickAction(action: string) {
        console.log(`Click action: ${this.translateService.instant(action)}`);
    }
}
