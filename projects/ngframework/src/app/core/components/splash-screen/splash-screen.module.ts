import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SplashScreenComponent } from './splash-screen.component';

@NgModule({
    declarations: [SplashScreenComponent],
    imports: [CommonModule],
    exports: [SplashScreenComponent],
})
export class SplashScreenModule {}
