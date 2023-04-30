import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';

@NgModule({
    declarations: [PrivateComponent],
    imports: [CommonModule, PrivateRoutingModule, HeaderModule, FooterModule],
    exports: []
})
export class PrivateModule {}
