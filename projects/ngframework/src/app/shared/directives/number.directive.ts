import { Directive, ElementRef, HostListener, Input, NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';

import { CommonRegex } from '../../core/constants/regex.const';

@Directive({
    selector: '[appNumber]'
})
export class NumberDirective {
    @Input() useComma?: boolean;
    @Input() control?: FormControl;
    @Input() minValue?: number;
    oldValue = '';
    element: any;
    timeKeyUp: any;
    selectionStart?: number;
    selectionEnd?: number;

    // Handler event keypress
    @HostListener('keypress', ['$event']) onKeyPress() {
        this.storeSelectorPosition();
    }

    // Handler event input to allow only input number
    @HostListener('input', ['$event']) onInput(event: any) {
        const regexp = CommonRegex.NumericHalfSize;
        if (regexp.test(event.currentTarget.value) && this.isValidMaxLength(event.currentTarget.value)) {
            // store backup value when value valid
            this.oldValue = event.currentTarget.value;
        } else {
            // revert to backup value when value invalid
            event.currentTarget.value = this.element.value = this.oldValue;
            this.element.selectionStart = this.selectionStart;
            this.element.selectionEnd = this.selectionEnd;
        }
        this.control?.setValue(event.currentTarget.value);
    }

    // Handler event compositionstart, jp keyboard (IME)
    @HostListener('compositionstart', ['$event']) onCompositionStart() {
        this.storeSelectorPosition();
    }

    @HostListener('keyup', ['$event']) onKeyUp(event: any) {
        if (this.useComma) {
            clearTimeout(this.timeKeyUp);
            if (event.which === 110 || event.which === 190) {
                return;
            }
            this.timeKeyUp = setTimeout(() => {
                const cc = this.element.value.replace(/,/g, '');
                this.element.value = cc.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
            }, 200);
        }
    }

    // Handler event paste in text box
    @HostListener('paste', ['$event']) preventPaste(event: any) {
        let clipboardData, type;
        if ((<any>window).clipboardData && (<any>window).clipboardData.getData) {
            type = 'Text';
            clipboardData = (<any>window).clipboardData;
        } else {
            type = event.clipboardData.types[0];
            clipboardData = event.clipboardData;
        }

        // Prevent if data is copied invalid - no use comma.
        const valueOfClipboard = this.useComma
            ? clipboardData.getData(type).replace(/,/g, '')
            : clipboardData.getData(type);
        const value = this.getIndexNumber(this.element.selectionStart, this.element.selectionEnd, valueOfClipboard);
        const regexp = CommonRegex.NumericHalfSize;

        if (!regexp.test(value)) {
            event.preventDefault();
        }
    }

    @HostListener('blur', ['$event']) onBlur() {
        // cut last character '.'
        if (this.element.value[this.element.value.length - 1] === '.') {
            this.element.value = this.element.value.slice(0, this.element.value.length - 1);
        }
        // set min
        if (this.minValue && +this.element.value < this.minValue) {
            this.element.value = this.minValue;
        }
    }

    @HostListener('drop', ['$event']) onDrop(e: DragEvent) {
        e.preventDefault();
    }

    constructor(private el: ElementRef) {
        this.element = this.el.nativeElement;
    }

    getIndexNumber(start: number, end: number, keyCode: string): string {
        if (end > start) {
            const value = this.element.value.slice(start, end);
            const valueReplace = value.replace(value, keyCode);
            return this.element.value.slice(0, start).concat(valueReplace).concat(this.element.value.slice(end));
        } else {
            const value = keyCode.concat(this.element.value.slice(start));
            return this.element.value.slice(0, start).concat(value);
        }
    }

    private storeSelectorPosition() {
        this.selectionStart = this.element.selectionStart;
        this.selectionEnd = this.element.selectionEnd;
    }

    private isValidMaxLength(value: string) {
        const maxLength = +this.element.getAttribute('maxlength');
        if (!maxLength) {
            return true;
        }
        const targetLength = (value && value.length) || 0;
        return targetLength <= maxLength;
    }
}

const directives = [NumberDirective];

@NgModule({
    declarations: directives,
    exports: directives
})
export class NumberDirectiveModule {}
