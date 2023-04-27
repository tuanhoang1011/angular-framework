import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyLoadTranslateModule } from '../../core/modules/lazy-load-translate.module';
import { SharedModule } from '../../shared/shared.module';
import { ExampleRoutingModule } from './example-routing.module';
import { ExampleComponent } from './example.component';

@NgModule({
    declarations: [ExampleComponent],
    imports: [CommonModule, SharedModule, ExampleRoutingModule, LazyLoadTranslateModule]
})
export class ExampleModule {}
