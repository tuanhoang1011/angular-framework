import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyLoadTranslateModule } from '../../../core/modules/lazy-load-translate.module';
import { MenuComponent } from './menu.component';

@NgModule({
    declarations: [MenuComponent],
    imports: [CommonModule, LazyLoadTranslateModule],
    exports: [MenuComponent]
})
export class MenuModule {}
