import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { DialogManagerModule } from './components/dialog-manager/dialog-manager.module';
import { LoadingModule } from './components/loading/loading.module';
import { MessageDialogModule } from './components/message-dialog/message-dialog.module';
import { MessageToastModule } from './components/message-toast/message-toast.module';
import { SplashScreenModule } from './components/splash-screen/splash-screen.module';
import { EnsureModuleLoadedOnceGuard } from './guards/ensure-module-loaded-once.guard';
import { HttpLoaderFactory } from './modules/lazy-load-translate.module';
import { HTTP_INTERCEPTORS_PROVIDERS } from './services/interceptors/http-interceptor';
import { GLOBAL_ERROR_PROVIDERS } from './services/log/global-error-handler.service';
import { GlobalVariables } from './utils/global-variables.ultility';

// ---------------- Defined modules ----------------
const modules: any = [
    MessageToastModule.forRoot(),
    MessageDialogModule,
    DialogManagerModule,
    LoadingModule,
    SplashScreenModule,
    CommonModule,
    HttpClientModule,
    TranslateModule.forRoot({
        defaultLanguage: GlobalVariables.defaultLanguage,
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
];

@NgModule({
    imports: [SharedModule, ...modules],
    exports: [...modules],
    providers: [GLOBAL_ERROR_PROVIDERS, HTTP_INTERCEPTORS_PROVIDERS]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
    }
}
