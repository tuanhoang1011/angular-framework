import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { sprintf } from 'sprintf-js';

import { LogIdentiferFormat, LogSubType, LogType } from '../../../core/constants/log.const';
import { LogService } from '../../../core/services/log/log.service';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
    @Input() content?: string;
    @Input() styleClass?: string;
    @Input() disabled? = false;
    @Input() isWriteLog? = true;
    @Output() onClickAction = new EventEmitter();

    constructor(private logService: LogService, private translateService: TranslateService) {}

    clickAction(e: any) {
        if (this.disabled) return;

        const writeLog = () => {
            if (this.isWriteLog && this.content) {
                // write log
                this.logService.operation(LogType.Action, {
                    subType: LogSubType.Button,
                    identifier: sprintf(LogIdentiferFormat.Button, this.translateService.instant(this.content))
                });
            }
        };

        switch (e.type) {
            case 'pointerdown':
                // 1: left click/touch
                if (e.which === 1) {
                    writeLog();
                    this.onClickAction.emit();
                }
                break;

            case 'keyup':
                // 13: enter/return key
                if (e.keyCode === 13) {
                    writeLog();
                    this.onClickAction.emit();
                }
                break;
        }
    }
}
