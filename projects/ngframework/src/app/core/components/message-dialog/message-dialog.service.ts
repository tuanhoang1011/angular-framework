import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ActionItem } from '../../models/item.model';
import { Message, MessageItem, MessageOptions } from '../../models/message.model';
import { MessageDialogState } from '../../models/state.model';
import { ComponentStoreBase } from '../../services/component-store-base.service';

export const YES_BUTTON: ActionItem = {
    label: 'BTN_0001',
    styleClass: 'btn-primary',
    isDefault: true
};
export const NO_BUTTON: ActionItem = {
    label: 'BTN_0002',
    styleClass: 'btn-danger'
};

export const CLOSE_BUTTON: ActionItem = {
    label: 'BTN_0003',
    styleClass: 'btn-secondary',
    isDefault: true
};

export const CANCEL_BUTTON: ActionItem = {
    label: 'BTN_0004',
    styleClass: 'btn-secondary'
};

@Injectable({
    providedIn: 'root'
})
export class MessageDialogService extends ComponentStoreBase<MessageDialogState> {
    readonly messageList$: Observable<Message[]> = this.select((state) => state.messages ?? []);

    private messages: Message[] = [];

    constructor() {
        super({
            messages: []
        });
    }

    getAllMessages = () => {
        return this.messages;
    };

    clearAll = () => {
        this.messages = [];
        this.setMessageState(this.messages);
    };

    clear = (id: string) => {
        this.messages = this.messages.filter((message) => message.id !== id);
        this.setMessageState(this.messages);
    };

    custom = (key: string, options?: MessageOptions) => this.show(key, options);

    success = (key: string, options?: MessageOptions, closeAction?: () => void) => {
        options = {
            ...options,
            styleClass: options?.styleClass ? `${options?.styleClass} dlg-success` : 'dlg-success',
            header: options?.header ?? 'MSG.TITLE_001'
        };

        this.setMessageParams(key, options, closeAction);
    };

    info = (key: string, options?: MessageOptions, closeAction?: () => void) => {
        options = {
            ...options,
            styleClass: options?.styleClass ? `${options?.styleClass} dlg-info` : 'dlg-info',
            header: options?.header ?? 'MSG.TITLE_005'
        };

        this.setMessageParams(key, options, closeAction);
    };

    error = (key: string, options?: MessageOptions, closeAction?: () => void) => {
        options = {
            ...options,
            styleClass: options?.styleClass ? `${options?.styleClass} dlg-error` : 'dlg-error',
            header: options?.header ?? 'MSG.TITLE_002'
        };

        this.setMessageParams(key, options, closeAction);
    };

    warn = (key: string, options?: MessageOptions, closeAction?: () => void) => {
        options = {
            ...options,
            styleClass: options?.styleClass ? `${options?.styleClass} dlg-warn` : 'dlg-warn',
            header: options?.header ?? 'MSG.TITLE_003'
        };

        this.setMessageParams(key, options, closeAction);
    };

    confirm = (
        key: string,
        options: MessageOptions = {},
        acceptAction?: () => void,
        rejectAction?: () => void,
        cancelAction?: () => void
    ): void => {
        options = {
            ...options,
            styleClass: options?.styleClass ? `${options?.styleClass} dlg-confirm` : 'dlg-confirm',
            header: options?.header ?? 'MSG.TITLE_004',
            actions: [
                { ...CANCEL_BUTTON, click: cancelAction },
                { ...NO_BUTTON, click: rejectAction },
                { ...YES_BUTTON, click: acceptAction }
            ]
        };

        this.show(key, options);
    };

    private setMessageParams(key: string, options: MessageOptions = {}, closeAction?: () => void) {
        // in case confirm message does not has any actions
        options = {
            ...options,
            actions: [{ ...CLOSE_BUTTON, click: closeAction }]
        };

        this.show(key, options);
    }

    private show(key: string, options: MessageOptions = {}) {
        try {
            this.messages.push(new MessageItem(key, options));
            this.setMessageState(this.messages);
        } catch (error) {
            throw error;
        }
    }

    private setMessageState(msgs: Message[]) {
        try {
            const state: MessageDialogState = {
                messages: msgs
            };
            this.updateState(state);
        } catch (error) {
            throw error;
        }
    }
}
