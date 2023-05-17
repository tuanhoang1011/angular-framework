import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';

import { ButtonModule } from '../button/button.module';
import { ImageViewModule } from '../image-view/image-view.module';
import { ImageCarouselComponent } from './image-carousel.component';

@NgModule({
    declarations: [ImageCarouselComponent],
    imports: [CommonModule, ImageViewModule, ButtonModule, CarouselModule],
    exports: [ImageCarouselComponent]
})
export class ImageCarouselModule {}
