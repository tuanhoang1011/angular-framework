import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';

// Module
const primengModules = [];

const appModule = [];

@NgModule({
    declarations: [PublicComponent],
    imports: [CommonModule, PublicRoutingModule, RouterModule, ...primengModules, ...appModule],
    exports: [...appModule]
})
export class PublicModule {}
