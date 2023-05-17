import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AutoFocusDirectiveModule } from '../../../shared/directives/auto-focus.directive';
import { SharedModule } from '../../../shared/shared.module';
import { LazyLoadTranslateModule } from '../../modules/lazy-load-translate.module';
import { MessageDialogComponent } from './message-dialog.component';

@NgModule({
    declarations: [MessageDialogComponent],
    exports: [MessageDialogComponent],
    imports: [CommonModule, LazyLoadTranslateModule, SharedModule, AutoFocusDirectiveModule]
})
export class MessageDialogModule {}
