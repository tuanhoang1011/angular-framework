import {
    AfterViewChecked,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    NgModule,
    OnChanges,
    OnInit,
    Output,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import { Router } from '@angular/router';

import { isNullOrUndefined } from '../../core/utils/common-func.ultility';
import { GlobalVariables } from '../../core/utils/global-variables.ultility';

@Directive({
    selector: '[scrollbarDialog]'
})
export class ScrollbarDialogDirective {
    constructor(private _elRef: ElementRef, private _renderer: Renderer2) {}

    @HostListener('window:resize', ['$event'])
    handleWindowResizeEvent(event: any) {
        const dialogWidth = this._elRef.nativeElement.children[0].children[0].children[0].clientWidth;
        const bodyWidth = document.body.clientWidth;
        const width = dialogWidth > bodyWidth ? bodyWidth : dialogWidth;
        this._renderer.setStyle(this._elRef.nativeElement.children[0].children[0].children[1], 'width', `${width}px`);
    }
}

@Directive({
    selector: '[scrollbarTable]'
})
export class ScrollbarTableDirective implements OnInit, OnChanges {
    @Input() hasOffsetTop: boolean = true;
    @Input() hasUpdateSize: boolean = true;
    @Input() bottomHeight: number = 0;
    @Input() scrollHeight = '';
    @Input() isDialog: boolean = false;
    @Output() scrollHeightChange: EventEmitter<string> = new EventEmitter<string>();

    constructor(private _elRef: ElementRef) {}

    ngOnInit() {
        this.updateWidthHeight();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes['hasUpdateSize']?.currentValue)) this.updateWidthHeight();
    }

    @HostListener('window:resize')
    handleWindowResizeEvent() {
        this.updateWidthHeight();
    }

    private updateWidthHeight() {
        setTimeout(() => {
            let offsetTop = this._elRef.nativeElement.offsetTop;

            if (this.hasOffsetTop && !offsetTop) return;

            const rootHeight = window.innerHeight;
            const finalHeight = `${this.isDialog ? GlobalVariables.standardSize.heightDialog : rootHeight}px`;

            // add more height under table
            const remainHeight = `${offsetTop + this.bottomHeight}px`;
            this.scrollHeight = `calc(${finalHeight} - ${remainHeight})`;
            this.scrollHeightChange.emit(this.scrollHeight);
        }, 200);
    }
}

@Directive({
    selector: '[scrollbarToBottomTable]'
})
export class ScrollbarToBottomTableDirective {
    @Output() scrollToBottomEl: EventEmitter<boolean> = new EventEmitter<boolean>(false);

    @HostListener('scroll', ['$event'])
    handleKeyboardEvent(event: any) {
        const { offsetHeight, scrollTop, scrollHeight } = event.srcElement;
        this.scrollToBottomEl.emit(scrollTop + offsetHeight === scrollHeight);
    }
}

@Directive({
    selector: '[scrollbarDiv]'
})
export class ScrollbarDivDirective implements AfterViewChecked {
    @Input() hasOffsetTop: boolean = true;

    @HostListener('window:resize')
    handleWindowResizeEvent() {
        this.updateWidthHeight();
    }

    constructor(private _elRef: ElementRef, private _renderer: Renderer2, private router: Router) {}

    ngAfterViewChecked() {
        this.updateWidthHeight();
    }

    private updateWidthHeight() {
        setTimeout(() => {
            let offsetTop = this._elRef.nativeElement.offsetTop;

            if (this.hasOffsetTop && !offsetTop) return;

            offsetTop = `${offsetTop}px`;
            const rootHeight = window.innerHeight;

            this._renderer.setStyle(this._elRef.nativeElement, 'max-height', `calc(${rootHeight}px - ${offsetTop})`);
        }, 200);
    }
}

const directives = [
    ScrollbarDialogDirective,
    ScrollbarTableDirective,
    ScrollbarToBottomTableDirective,
    ScrollbarDivDirective
];

@NgModule({
    declarations: directives,
    exports: directives
})
export class ScrollbarDirectiveModule {}
