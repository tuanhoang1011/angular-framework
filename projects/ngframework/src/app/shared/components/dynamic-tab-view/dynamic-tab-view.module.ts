import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabViewModule } from 'primeng/tabview';

import { LazyLoadTranslateModule } from '../../../core/modules/lazy-load-translate.module';
import { TemplateDirectiveModule } from '../../directives/template.directive';
import { DynamicTabViewComponent } from './dynamic-tab-view.component';

@NgModule({
    declarations: [DynamicTabViewComponent],
    imports: [CommonModule, LazyLoadTranslateModule, TemplateDirectiveModule, TabViewModule],
    exports: [DynamicTabViewComponent]
})
export class DynamicTabViewModule {}
