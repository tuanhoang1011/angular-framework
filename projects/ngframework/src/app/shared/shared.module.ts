import { NgModule } from '@angular/core';

import { ButtonModule } from './components/button/button.module';
import { HyperLinkModule } from './components/hyperlink/hyperlink.module';
import { ImageViewModule } from './components/image-preview/image-view.module';
import { AutoFocusDirectiveModule } from './directives/auto-focus.directive';
import { ImageSizeDirectiveModule } from './directives/image-size.directive';
import { FormatTextPipeModule } from './pipes/format-text.pipe';
import { SprintfPipeModule } from './pipes/sprintf.pipe';

// ---------------- Defined modules ----------------
const modules = [ButtonModule, HyperLinkModule, ImageViewModule];

// ---------------- Directives ----------------
const directives = [AutoFocusDirectiveModule, ImageSizeDirectiveModule];

// ------------------- Pipes ------------------
const pipes = [SprintfPipeModule, FormatTextPipeModule];

@NgModule({
    imports: [...modules, ...directives, ...pipes],
    exports: [...modules, ...directives, ...pipes]
})
export class SharedModule {}
