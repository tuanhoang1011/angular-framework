import { ElementRef } from '@angular/core';
import { head } from 'lodash';

export function focusError(el?: ElementRef | any) {
    const focusables = [
        'input',
        'select',
        'textarea',
        'p-autocomplete',
        'p-dropdown',
        'p-multiselect',
        'p-radiobutton',
        'p-calendar'
    ];

    const focusList = (el ? el.nativeElement : document).querySelectorAll(
        focusables
            .map((x) => `${x}:not([tabindex = "-1"]):not([style*="display:none"]):not([hidden]).ng-invalid`)
            .join(',')
    );

    if (focusList) {
        const focusableEls = Array.from(focusList).filter((el: any) => !el.disabled);
        const firstFocusableEl: any = head(focusableEls);
        if (firstFocusableEl) {
            const input = _getInputElement(firstFocusableEl);
            input?.focus();
        }
    }
}

export function _getInputElement(nativeElement: any) {
    if (!nativeElement || !nativeElement.children) return undefined;
    if (
        !nativeElement.children.length &&
        (nativeElement.localName === 'input' || nativeElement.localName === 'textarea') &&
        !nativeElement.hidden
    )
        return nativeElement;

    let input;

    [].slice.call(nativeElement.children).every((c) => {
        input = _getInputElement(c);
        if (input) return false; // break
        return true; // continue!
    });

    return input;
}
