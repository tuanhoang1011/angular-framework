import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

import { LazyLoadTranslateModule } from '../../../core/modules/lazy-load-translate.module';
import { SharedModule } from '../../../shared/shared.module';
import { DialogAComponent } from './dialog-a.component';

@NgModule({
    declarations: [DialogAComponent],
    exports: [DialogAComponent],
    imports: [CommonModule, DialogModule, LazyLoadTranslateModule, SharedModule]
})
export class DialogAModule {}
