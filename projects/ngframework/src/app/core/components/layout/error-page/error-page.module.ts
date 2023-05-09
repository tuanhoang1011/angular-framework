import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../../shared/shared.module';
import { LazyLoadTranslateModule } from '../../../modules/lazy-load-translate.module';
import { ErrorPageRoutingModule } from './error-page-routing.module';
import { ErrorPageComponent } from './error-page.component';

@NgModule({
    declarations: [ErrorPageComponent],
    imports: [CommonModule, ErrorPageRoutingModule, SharedModule, LazyLoadTranslateModule]
})
export class ErrorPageModule {}
