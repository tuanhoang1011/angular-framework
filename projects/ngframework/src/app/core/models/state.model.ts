import { DialogInfo } from './common.model';

export interface GlobalState {
    activeScreen?: string;
    activeDialog?: string;
}

export interface DialogManagerState {
    dialogs?: DialogInfo[];
    openedDialog?: DialogInfo;
    closedDialog?: DialogInfo;
}
