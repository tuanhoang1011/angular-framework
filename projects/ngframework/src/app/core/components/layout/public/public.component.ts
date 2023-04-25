import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DialogAComponent } from 'projects/ngframework/src/app/features/example/dialog-a/dialog-a.component';
import { DialogAService } from 'projects/ngframework/src/app/features/example/dialog-a/dialog-a.service';
import { DialogBComponent } from 'projects/ngframework/src/app/features/example/dialog-b/dialog-b.component';
import { takeUntil } from 'rxjs';

import { DialogInfo } from '../../../models/common.model';
import { GlobalState } from '../../../models/state.model';
import { BaseComponent } from '../../base.component';
import { DialogManagerService } from '../../dialog-manager/dialog-manager.service';

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html',
    styleUrls: ['./public.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicComponent extends BaseComponent {
    constructor(private dialogService: DialogManagerService, private dialogAService: DialogAService) {
        super();

        this.dialogService.closedDialog$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            if (res) {
                console.log(res);
            }
        });
    }

    openDialogA() {
        const dialog: DialogInfo = {
            dialogId: 'Dialog A',
            component: DialogAComponent
        };

        this.dialogService.open(dialog);

        this.dialogAService.updateState({ activeDialog: 'A', activeScreen: 'A' } as GlobalState);
    }

    openDialogB() {
        const dialog: DialogInfo = {
            dialogId: 'Dialog B',
            component: DialogBComponent
        };

        this.dialogService.open(dialog);
    }

    updateDialogA() {
        this.dialogAService.updateState({ activeDialog: 'B', activeScreen: 'B' } as GlobalState);
    }

    removeDialogA() {
        this.dialogService.close('Dialog A');
    }
}
