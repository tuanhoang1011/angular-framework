import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MenuModule } from '../../../shared/components/menu/menu.module';
import { FooterComponent } from './footer.component';

@NgModule({
    declarations: [FooterComponent],
    imports: [CommonModule, MenuModule],
    exports: [FooterComponent]
})
export class FooterModule {}
