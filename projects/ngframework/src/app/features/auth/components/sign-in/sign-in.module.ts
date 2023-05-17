import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyLoadTranslateModule } from '../../../../core/modules/lazy-load-translate.module';
import { SharedModule } from '../../../../shared/shared.module';
import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';

@NgModule({
    declarations: [SignInComponent],
    imports: [CommonModule, SignInRoutingModule, LazyLoadTranslateModule, SharedModule],
    exports: [SignInComponent]
})
export class SignInModule {}
