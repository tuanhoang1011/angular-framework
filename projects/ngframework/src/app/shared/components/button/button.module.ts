import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyLoadTranslateModule } from '../../../core/modules/lazy-load-translate.module';
import { ButtonComponent } from './button.component';

@NgModule({
    declarations: [ButtonComponent],
    imports: [CommonModule, LazyLoadTranslateModule],
    exports: [ButtonComponent]
})
export class ButtonModule {}
