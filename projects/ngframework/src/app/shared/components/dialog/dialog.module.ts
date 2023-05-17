import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule as PrimeDialogModule } from 'primeng/dialog';

import { LazyLoadTranslateModule } from '../../../core/modules/lazy-load-translate.module';
import { DialogComponent } from './dialog.component';

@NgModule({
    declarations: [DialogComponent],
    imports: [CommonModule, PrimeDialogModule, LazyLoadTranslateModule],
    exports: [DialogComponent]
})
export class DialogModule {}
