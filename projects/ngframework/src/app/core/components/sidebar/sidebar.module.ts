import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'projects/ngframework/src/app/shared/shared.module';

import { SidebarComponent } from './sidebar.component';

@NgModule({
    declarations: [SidebarComponent],
    imports: [CommonModule, SharedModule],
    exports: [SidebarComponent]
})
export class SidebarModule {}
