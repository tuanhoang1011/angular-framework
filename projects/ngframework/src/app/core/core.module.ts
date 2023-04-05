import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';
import { HTTP_INTERCEPTOR_PROVIDERS } from './interceptors/http-interceptor';

// ---------------- Defined modules ----------------

const modules: any = [];
const imports = [CommonModule, HttpClientModule, ...modules];
const exports = [...modules];

@NgModule({
    imports: imports,
    exports: exports,
    providers: [HTTP_INTERCEPTOR_PROVIDERS]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
