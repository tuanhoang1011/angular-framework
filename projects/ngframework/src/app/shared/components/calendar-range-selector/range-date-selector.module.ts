import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

import { LazyLoadTranslateModule } from '../../../core/modules/lazy-load-translate.module';
import { FormatTextPipeModule } from '../../pipes/format-text.pipe';
import { RangeDateSelectorComponent } from './range-date-selector.component';

@NgModule({
    declarations: [RangeDateSelectorComponent],
    imports: [CommonModule, LazyLoadTranslateModule, CalendarModule, FormatTextPipeModule, FormsModule],
    exports: [RangeDateSelectorComponent]
})
export class RangeDateSelectorModule {}
