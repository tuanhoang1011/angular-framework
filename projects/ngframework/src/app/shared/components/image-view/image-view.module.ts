import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImageSizeDirectiveModule } from '../../directives/image-size.directive';
import { ButtonModule } from '../button/button.module';
import { ImageViewComponent } from './image-view.component';

@NgModule({
    declarations: [ImageViewComponent],
    imports: [CommonModule, ImageSizeDirectiveModule, ButtonModule],
    exports: [ImageViewComponent]
})
export class ImageViewModule {}
