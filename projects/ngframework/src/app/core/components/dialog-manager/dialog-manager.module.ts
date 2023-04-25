import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogAModule } from '../../../features/example/dialog-a/dialog-a.module';
import { DialogBModule } from '../../../features/example/dialog-b/dialog-b.module';
import { DialogManagerComponent } from './dialog-manager.component';

@NgModule({
    declarations: [DialogManagerComponent],
    exports: [DialogManagerComponent],
    imports: [CommonModule, DialogBModule, DialogAModule]
})
export class DialogManagerModule {}
