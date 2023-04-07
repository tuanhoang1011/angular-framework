import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { MessageOptions } from '../../models/message.model';

@Injectable({
    providedIn: 'root'
})
export class MessageToastService {
    constructor(private msgService: MessageService) {}

    show = (id: string, type: 'success' | 'info' | 'warn' | 'error', options?: MessageOptions) => {
        let icon = '';

        switch (type) {
            case 'success':
                icon = 'pi-check-circle';
                break;

            case 'info':
                icon = 'pi-info-circle';
                break;

            case 'warn':
                icon = 'pi-exclamation-triangle';
                break;

            case 'error':
                icon = 'pi-times-circle';
                break;
        }

        this.msgService.add({
            id: id,
            summary: options?.header,
            severity: type,
            detail: id,
            icon: icon,
            life: 1000,
            closable: options?.closable ?? true,
            sticky: type === 'success' ? false : options?.sticky ?? true,
            styleClass: options?.contentStyleClass,
            contentStyleClass: options?.contentStyleClass,
            data: options
        });
    };

    success = (id: string, options?: MessageOptions): void => {
        this.show(id, 'success', options);
    };

    info = (id: string, options?: MessageOptions): void => {
        this.show(id, 'info', options);
    };

    error = (id: string, options?: MessageOptions): void => {
        this.show(id, 'error', options);
    };

    warn = (id: string, options?: MessageOptions): void => {
        this.show(id, 'warn', options);
    };

    clear = () => {
        this.msgService.clear();
    };
}
