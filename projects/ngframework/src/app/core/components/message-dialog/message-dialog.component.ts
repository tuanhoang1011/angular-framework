import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { sprintf } from 'sprintf-js';

import { LogIdentiferFormat, LogSubType, LogType } from '../../constants/log.const';
import { Message, MessageAction } from '../../models/message.model';
import { LogService } from '../../services/log/log.service';
import { MessageDialogService } from './message-dialog.service';

@Component({
    selector: 'app-message-dialog',
    templateUrl: './message-dialog.component.html',
    styleUrls: ['./message-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageDialogComponent {
    constructor(
        public msgDialogService: MessageDialogService,
        private logService: LogService,
        private translateService: TranslateService
    ) {}

    clickAction(msgItem: Message, action: MessageAction) {
        try {
            this.msgDialogService.clear(msgItem.id);

            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.Button,
                identifier: sprintf(
                    LogIdentiferFormat.MessageButton,
                    this.translateService.instant(msgItem.key),
                    this.translateService.instant(action.label)
                )
            });

            if (action.click) {
                action.click();
            }
        } catch (error) {
            throw error;
        }
    }

    closeMessage(msgItem: Message) {
        try {
            this.msgDialogService.clear(msgItem.id);

            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.Button,
                identifier: sprintf(LogIdentiferFormat.MessageButton, 'X', this.translateService.instant(msgItem.key))
            });

            if (msgItem.options?.clickX) msgItem.options.clickX();
        } catch (error) {
            throw error;
        }
    }

    msgByKey(index, msg) {
        return msg.key;
    }

    actionByLabel(index, action) {
        return action.label;
    }
}
