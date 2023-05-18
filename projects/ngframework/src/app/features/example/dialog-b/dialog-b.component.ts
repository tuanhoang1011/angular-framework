import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BaseComponent } from '../../../core/components/base.component';
import { DialogManagerService } from '../../../core/components/dialog-manager/dialog-manager.service';

@Component({
    selector: 'app-dialog-b',
    templateUrl: './dialog-b.component.html',
    styleUrls: ['./dialog-b.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogBComponent extends BaseComponent {
    data: any;

    constructor(private translateService: TranslateService, private dialogManagerService: DialogManagerService) {
        super(undefined, 'Dialog B - Screen');
    }

    close() {
        console.log(`Close ${this.data.dialogId}`);
        this.dialogManagerService.close(this.data.dialogId);
    }
}
