import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { sprintf } from 'sprintf-js';

import { LogIdentiferFormat, LogSubType, LogType } from '../../../core/constants/log.const';
import { LogService } from '../../../core/services/log.service';

@Component({
    selector: 'app-hyperlink',
    templateUrl: './hyperlink.component.html',
    styleUrls: ['./hyperlink.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HyperlinkComponent {
    @Input() content: string = '';
    @Input() styleClass?: string;
    @Input() disabled? = false;
    @Input() isWriteLog? = true;
    @Output() onClickAction = new EventEmitter();

    constructor(private logService: LogService, private translateService: TranslateService) {}

    onClick(event: any) {
        if (this.disabled) return;

        if (this.isWriteLog) {
            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.HyperLink,
                identifier: sprintf(LogIdentiferFormat.Hyperlink, this.translateService.instant(this.content))
            });
        }

        this.onClickAction.emit(event);
    }
}
