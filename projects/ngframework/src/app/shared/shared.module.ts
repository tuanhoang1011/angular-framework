import { NgModule } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';

import { ButtonModule } from './components/button/button.module';
import { HyperLinkModule } from './components/hyperlink/hyperlink.module';
import { ImageCarouselModule } from './components/image-carousel/image-carousel.module';
import { ImageViewModule } from './components/image-view/image-view.module';
import { MenuModule } from './components/menu/menu.module';
import { AutoFocusDirectiveModule } from './directives/auto-focus.directive';
import { ImageSizeDirectiveModule } from './directives/image-size.directive';
import { FormatTextPipeModule } from './pipes/format-text.pipe';
import { SprintfPipeModule } from './pipes/sprintf.pipe';

// ---------------- Defined modules ----------------
const modules = [
    ButtonModule,
    HyperLinkModule,
    ImageViewModule,
    ImageCarouselModule,
    OverlayPanelModule,
    SkeletonModule,
    DialogModule,
    MenuModule,
    PanelModule
];

// ---------------- Directives ----------------
const directives = [AutoFocusDirectiveModule, ImageSizeDirectiveModule];

// ------------------- Pipes ------------------
const pipes = [SprintfPipeModule, FormatTextPipeModule];

@NgModule({
    imports: [...modules, ...directives, ...pipes],
    exports: [...modules, ...directives, ...pipes]
})
export class SharedModule {}
