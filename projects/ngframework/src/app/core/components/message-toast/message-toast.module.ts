import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

import { ButtonModule } from '../../../shared/components/button/button.module';
import { AutoFocusDirectiveModule } from '../../../shared/directives/auto-focus.directive';
import { SharedModule } from '../../../shared/shared.module';
import { LazyLoadTranslateModule } from '../../modules/lazy-load-translate.module';
import { MessageToastComponent } from './message-toast.component';

@NgModule({
    declarations: [MessageToastComponent],
    exports: [MessageToastComponent],
    imports: [CommonModule, AutoFocusDirectiveModule, ButtonModule, ToastModule, LazyLoadTranslateModule, SharedModule]
})
export class MessageToastModule {
    static forRoot(): ModuleWithProviders<MessageToastModule> {
        return {
            ngModule: MessageToastModule,
            providers: [MessageService]
        };
    }
}
