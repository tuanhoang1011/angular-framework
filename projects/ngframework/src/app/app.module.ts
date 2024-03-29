import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, CoreModule, SharedModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    static injector: Injector;

    constructor(injector: Injector) {
        AppModule.injector = injector;
    }
}
