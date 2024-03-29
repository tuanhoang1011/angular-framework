import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
    declarations: [AuthComponent],
    imports: [AuthRoutingModule],
    exports: [AuthComponent]
})
export class AuthModule {}
