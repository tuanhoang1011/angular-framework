import { Directive, Input, NgModule, TemplateRef } from '@angular/core';

@Directive({
    selector: 'ng-template[appTemplate]'
})
export class TemplateDirective {
    @Input('appTemplate') appTemplate?: string;

    constructor(public templateRef: TemplateRef<any>) {}
}

const directives = [TemplateDirective];

@NgModule({
    declarations: directives,
    exports: directives
})
export class TemplateDirectiveModule {}
