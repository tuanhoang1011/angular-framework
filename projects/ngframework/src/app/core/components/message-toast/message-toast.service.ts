import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

import { MessageOptions } from '../../models/message.model';
import { GlobalVariables } from '../../utils/global-variables.ultility';

@Injectable({
    providedIn: 'root'
})
export class MessageToastService {
    constructor(private msgService: MessageService) {}

    show = (id: string, type: 'success' | 'info' | 'warn' | 'error', options?: MessageOptions) => {
        this.msgService.add({
            id: id,
            summary: options?.header,
            severity: type,
            detail: id,
            icon: options?.icon,
            life: GlobalVariables.messageLifeTimeMilSecond,
            closable: options?.closable ?? true,
            sticky: type === 'success' ? false : options?.sticky ?? true,
            styleClass: options?.contentStyleClass,
            contentStyleClass: options?.contentStyleClass,
            data: options
        });
    };

    success = (id: string, options?: MessageOptions): void => {
        options = {
            ...options,
            header: options?.header ?? 'MSG.TITLE_001',
            icon: options?.icon ?? 'pi-check-circle'
        };

        this.show(id, 'success', options);
    };

    info = (id: string, options?: MessageOptions): void => {
        options = {
            ...options,
            header: options?.header ?? 'MSG.TITLE_005',
            icon: options?.icon ?? 'pi-info-circle'
        };

        this.show(id, 'info', options);
    };

    error = (id: string, options?: MessageOptions): void => {
        options = {
            ...options,
            header: options?.header ?? 'MSG.TITLE_002',
            icon: options?.icon ?? 'pi-times-circle'
        };

        this.show(id, 'error', options);
    };

    warn = (id: string, options?: MessageOptions): void => {
        options = {
            ...options,
            header: options?.header ?? 'MSG.TITLE_003',
            icon: options?.icon ?? 'pi-exclamation-triangle'
        };

        this.show(id, 'warn', options);
    };

    clear = () => {
        this.msgService.clear();
    };
}
