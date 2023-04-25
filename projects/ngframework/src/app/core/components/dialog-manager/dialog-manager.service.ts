import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DialogInfo } from '../../models/common.model';
import { DialogManagerState } from '../../models/state.model';
import { ComponentStoreBase } from '../../services/state-manager/component-store/component-store-base.service';

@Injectable({
    providedIn: 'root'
})
export class DialogManagerService extends ComponentStoreBase<DialogManagerState> {
    private readonly dialogs$: Observable<Array<DialogInfo>> = this.select((state) => state.dialogs ?? []);
    readonly openedDialog$: Observable<DialogInfo> = this.select((state) => state.openedDialog!);
    readonly closedDialog$: Observable<DialogInfo> = this.select((state) => state.closedDialog!);

    readonly vm$ = this.select(
        this.dialogs$,
        this.openedDialog$,
        this.closedDialog$,
        (dialogs, openedDialog, closedDialog) => ({
            dialogs,
            openedDialog,
            closedDialog
        })
    );

    constructor() {
        super({
            dialogs: [],
            openedDialog: undefined,
            closedDialog: undefined
        });
    }

    open(dialogInfo: DialogInfo) {
        try {
            // add new dialog to array
            const openedDialog: DialogInfo = {
                dialogId: dialogInfo.dialogId,
                component: dialogInfo.component
            };
            this.getStates.dialogs!.push(openedDialog);

            const newState: DialogManagerState = {
                dialogs: this.getStates.dialogs,
                openedDialog
            };
            this.updateState(newState);
        } catch (error) {
            throw error;
        }
    }

    close(dialogId: string) {
        try {
            // remove dialog from array
            const closedDialog = this.getStates.dialogs!.find((dlg) => dlg.dialogId === dialogId);

            if (closedDialog) {
                this.getStates.dialogs = this.getStates.dialogs!.filter((dlg) => dlg.dialogId !== dialogId);

                const newState: DialogManagerState = {
                    dialogs: this.getStates.dialogs,
                    closedDialog
                };
                this.updateState(newState);
            }
        } catch (error) {
            throw error;
        }
    }
}
