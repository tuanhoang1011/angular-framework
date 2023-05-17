import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyLoadTranslateModule } from '../../../core/modules/lazy-load-translate.module';
import { SharedModule } from '../../../shared/shared.module';
import { DialogBComponent } from './dialog-b.component';

@NgModule({
    declarations: [DialogBComponent],
    exports: [DialogBComponent],
    imports: [CommonModule, LazyLoadTranslateModule, SharedModule]
})
export class DialogBModule {}
