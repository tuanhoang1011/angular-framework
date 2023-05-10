import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LazyLoadTranslateModule } from '../../modules/lazy-load-translate.module';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
    declarations: [BreadcrumbComponent],
    imports: [CommonModule, HttpClientModule, LazyLoadTranslateModule, RouterModule],
    exports: [BreadcrumbComponent]
})
export class BreadcrumbModule {}
