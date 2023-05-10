import {
    ChangeDetectionStrategy,
    Component,
    ComponentRef,
    OnInit,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs';

import { DialogInfo } from '../../models/common.model';
import { BaseComponent } from '../base.component';
import { DialogManagerService } from './dialog-manager.service';

@Component({
    selector: 'app-dialog-manager',
    templateUrl: './dialog-manager.component.html',
    styleUrls: ['./dialog-manager.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogManagerComponent extends BaseComponent implements OnInit {
    @ViewChild('dlgManager', {
        read: ViewContainerRef,
        static: true
    })
    dlgManagerRef!: ViewContainerRef;

    dlgComponentRef: { dialogId: string; componentRef: ComponentRef<any> }[] = [];

    constructor(private dialogService: DialogManagerService) {
        super();
    }

    ngOnInit(): void {
        this.dlgManagerRef.clear();
        this.listenState();
    }

    private listenState() {
        try {
            this.dialogService.vm$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
                if (res.openedDialog) {
                    this.addDialog(res.openedDialog);
                }

                if (res.closedDialog) {
                    this.removeDialog(res.closedDialog);
                }
            });
        } catch (error) {
            throw error;
        }
    }

    private addDialog(dialog: DialogInfo) {
        try {
            const componentRef = this.dlgManagerRef.createComponent<any>(dialog.component);

            /** =====IMPORTANT=====
             * must have below code
             * after excute detectChanges -> methods of life cycle hook (EXCEPT ngOnChange) of created component will be trigger
             * due to ngOnChange not be trigger -> in order to detect change of 'data' variable in created component -> use get() and set() for 'data'
             */
            componentRef.changeDetectorRef.detectChanges();

            this.dlgComponentRef.push({
                dialogId: dialog.dialogId,
                componentRef
            });

            // remove openedDialog state
            this.dialogService.updateState({
                openedDialog: undefined
            });
        } catch (error) {
            throw error;
        }
    }

    private removeDialog(dialog: DialogInfo) {
        try {
            const idx = this.dlgComponentRef.findIndex((item) => item.dialogId === dialog.dialogId);

            if (idx >= 0) {
                this.dlgManagerRef.remove(idx);
                this.dlgComponentRef = this.dlgComponentRef.filter((item) => item.dialogId !== dialog.dialogId);

                // remove closedDialog state
                this.dialogService.updateState({
                    closedDialog: undefined
                });
            }
        } catch (error) {
            throw error;
        }
    }
}
