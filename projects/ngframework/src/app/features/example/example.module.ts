import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from '../../core/components/layout/breadcrumb/breadcrumb.module';
import { LazyLoadTranslateModule } from '../../core/modules/lazy-load-translate.module';
import { SharedModule } from '../../shared/shared.module';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Component3Component } from './component3/component3.component';
import { ExampleRoutingModule } from './example-routing.module';
import { ExampleComponent } from './example.component';

@NgModule({
    declarations: [ExampleComponent, Component1Component, Component2Component, Component3Component],
    imports: [CommonModule, SharedModule, ExampleRoutingModule, BreadcrumbModule, LazyLoadTranslateModule]
})
export class ExampleModule {}
