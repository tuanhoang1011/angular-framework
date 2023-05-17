import { NgModule } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PanelModule } from 'primeng/panel';
import { SkeletonModule } from 'primeng/skeleton';

import { ButtonModule } from './components/button/button.module';
import { RangeDateSelectorModule } from './components/calendar-range-selector/range-date-selector.module';
import { DialogModule } from './components/dialog/dialog.module';
import { DynamicTabViewModule } from './components/dynamic-tab-view/dynamic-tab-view.module';
import { HyperLinkModule } from './components/hyperlink/hyperlink.module';
import { ImageCarouselModule } from './components/image-carousel/image-carousel.module';
import { ImageViewModule } from './components/image-view/image-view.module';
import { MenuModule } from './components/menu/menu.module';
import { AutoFocusDirectiveModule } from './directives/auto-focus.directive';
import { ImageSizeDirectiveModule } from './directives/image-size.directive';
import { NumberDirectiveModule } from './directives/number.directive';
import { ScrollbarDirectiveModule } from './directives/scrollbar.directive';
import { TemplateDirectiveModule } from './directives/template.directive';
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
    MenuModule,
    PanelModule,
    DynamicTabViewModule,
    RangeDateSelectorModule,
    DialogModule
];

// ---------------- Directives ----------------
const directives = [
    AutoFocusDirectiveModule,
    ImageSizeDirectiveModule,
    ScrollbarDirectiveModule,
    NumberDirectiveModule,
    TemplateDirectiveModule
];

// ------------------- Pipes ------------------
const pipes = [SprintfPipeModule, FormatTextPipeModule];

@NgModule({
    imports: [...modules, ...directives, ...pipes],
    exports: [...modules, ...directives, ...pipes]
})
export class SharedModule {}
