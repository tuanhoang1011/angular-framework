import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { OverlayPanelModule } from 'primeng/overlaypanel';

import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';

// Module
const primengModules = [OverlayPanelModule, MenuModule];
const appModule = [];

@NgModule({
    declarations: [PrivateComponent],
    imports: [CommonModule, PrivateRoutingModule, RouterModule, ...primengModules, ...appModule],
    exports: [...appModule]
})
export class PrivateModule {}
