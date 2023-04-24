import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LazyLoadTranslateModule } from 'projects/ngframework/src/app/core/modules/lazy-load-translate.module';
import { ButtonModule } from 'projects/ngframework/src/app/shared/components/button/button.module';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
    declarations: [SignInComponent],
    imports: [
        CommonModule,
        SignInRoutingModule,
        LazyLoadTranslateModule,
        // DynamicFormModule,
        ButtonModule
        // HyperLinkModule,
        // TrapFocusDirectiveModule
    ],
    exports: [SignInComponent]
})
export class SignInModule {}
