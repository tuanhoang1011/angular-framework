import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterModule } from '../footer/footer.module';
import { HeaderModule } from '../header/header.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';

@NgModule({
    declarations: [PublicComponent],
    imports: [CommonModule, PublicRoutingModule, HeaderModule, FooterModule, SidebarModule]
})
export class PublicModule {}
