import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseComponent } from '../../../core/components/base.component';
import { DialogManagerService } from '../../../core/components/dialog-manager/dialog-manager.service';

@Component({
    selector: 'app-dialog-a',
    templateUrl: './dialog-a.component.html',
    styleUrls: ['./dialog-a.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAComponent extends BaseComponent {
    data: any;

    constructor(private translateService: TranslateService, private dialogManagerService: DialogManagerService) {
        super(undefined, 'Dialog A - Screen');
    }

    close() {
        this.data.clickFunc1();
        console.log(`Close ${this.data.dialogId}`);
        this.dialogManagerService.close(this.data.dialogId);
    }

    clickAction(action: string) {
        this.data.clickFunc2();
        alert(`Click action: ${this.translateService.instant(action)}`);
    }
}
