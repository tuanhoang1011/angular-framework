import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep } from 'lodash';

import { BaseComponent } from '../../../core/components/base.component';
import { DialogManagerService } from '../../../core/components/dialog-manager/dialog-manager.service';
import { GlobalState } from '../../../core/models/state.model';
import { DialogAService } from './dialog-a.service';

@Component({
    selector: 'app-dialog-a',
    templateUrl: './dialog-a.component.html',
    styleUrls: ['./dialog-a.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogAComponent extends BaseComponent implements OnInit {
    data: GlobalState = {};

    constructor(
        private translateService: TranslateService,
        private cdr: ChangeDetectorRef,
        private dialogAService: DialogAService,
        private dialogService: DialogManagerService
    ) {
        super('Dialog A');
    }

    ngOnInit(): void {
        this.dialogAService.vm$.subscribe((res) => {
            console.log(cloneDeep(res));
            this.data = res;
            this.cdr.markForCheck();
        });
    }

    close() {
        console.log('Close Dialog A');
        this.dialogService.close('Dialog A');
    }

    clickAction(action: string) {
        console.log(`Click action: ${this.translateService.instant(action)}`);
    }
}
