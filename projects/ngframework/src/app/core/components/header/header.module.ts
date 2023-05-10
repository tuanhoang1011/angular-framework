import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'projects/ngframework/src/app/shared/shared.module';

import { LazyLoadTranslateModule } from '../../modules/lazy-load-translate.module';
import { HeaderComponent } from './header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [CommonModule, SharedModule, LazyLoadTranslateModule],
    exports: [HeaderComponent]
})
export class HeaderModule {}
