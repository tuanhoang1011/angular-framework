import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LazyLoadTranslateModule } from '../../../core/modules/lazy-load-translate.module';
import { HyperlinkComponent } from './hyperlink.component';

@NgModule({
    declarations: [HyperlinkComponent],
    imports: [CommonModule, LazyLoadTranslateModule, RouterModule],
    exports: [HyperlinkComponent]
})
export class HyperLinkModule {}
