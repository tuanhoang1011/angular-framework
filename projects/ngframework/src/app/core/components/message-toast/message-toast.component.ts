import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-message-toast',
    templateUrl: './message-toast.component.html',
    styleUrls: ['./message-toast.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MessageToastComponent {
    position = 'bottom-right';
    preventDuplicates = false;
    styleClass = '';

    constructor() {}
}
