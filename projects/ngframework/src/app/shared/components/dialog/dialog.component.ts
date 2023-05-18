import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Dialog } from 'primeng/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
    @ViewChild('ref', {
        read: Dialog,
        static: true
    })
    ref!: Dialog;

    @Input() dialogId: string = '';
    @Input() styleClass?: string;
    @Input() headerClassName?: string;
    @Input() contentClassName?: string;
    @Input() footerClassName?: string;
    @Input() headerTitle?: string;
    @Input() closable: boolean = true;
    @Input() closeOnEscape: boolean = false;
    @Input() draggable: boolean = true;
    @Input() keepInViewport: boolean = true;
    @Input() maximizable: boolean = false;
    @Input() maximized: boolean = false;
    @Input() minX: number = 0;
    @Input() minY: number = 0;
    @Input() position:
        | 'center'
        | 'left'
        | 'top'
        | 'bottom'
        | 'right'
        | 'bottom-right'
        | 'bottom-left'
        | 'top-right'
        | 'top-left' = 'center';
    @Input() resizable: boolean = false;
    @Input() showHeader: boolean = true;
    @Input() modal: boolean = true;
    @Output() onHide = new EventEmitter();
    @Output() onShow = new EventEmitter();

    constructor() {}

    show() {
        this.onShow.emit();
    }

    hide() {
        this.onHide.emit();
    }

    maximize() {
        this.ref.maximize();
    }
}
