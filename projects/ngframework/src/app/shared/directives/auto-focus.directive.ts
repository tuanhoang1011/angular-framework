import { AfterViewChecked, Directive, ElementRef, NgModule } from '@angular/core';

@Directive({
    selector: '[autoFocus]'
})
export class AutoFocusDirective implements AfterViewChecked {
    constructor(private readonly elementRef: ElementRef) {}

    ngAfterViewChecked(): void {
        this.elementRef.nativeElement.focus();
    }
}

@NgModule({
    declarations: [AutoFocusDirective],
    exports: [AutoFocusDirective]
})
export class AutoFocusDirectiveModule {}
