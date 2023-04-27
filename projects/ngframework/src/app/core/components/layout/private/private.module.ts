import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';

@NgModule({
    declarations: [PrivateComponent],
    imports: [CommonModule, PrivateRoutingModule, RouterModule],
    exports: []
})
export class PrivateModule {}
