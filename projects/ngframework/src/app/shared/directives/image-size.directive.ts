import { AfterViewInit, Directive, ElementRef, HostListener, Input, NgModule, Renderer2 } from '@angular/core';

import { CommonConstant } from '../../core/constants/common.const';

@Directive({
    selector: '[imageSize]'
})
export class ImageSizeDirective implements AfterViewInit {
    @Input() imgRatio: number = CommonConstant.ImageRatio.Thumbnail.ratio;

    constructor(private elRef: ElementRef, private renderer2: Renderer2) {}

    ngAfterViewInit(): void {
        this.setImageSize();
    }

    @HostListener('window:resize')
    handleWindowResizeEvent() {
        this.setImageSize();
    }

    private setImageSize() {
        const height = this.elRef.nativeElement.offsetWidth / this.imgRatio;
        this.renderer2.setStyle(this.elRef.nativeElement, 'height', `${height}px`);
    }
}

@NgModule({
    declarations: [ImageSizeDirective],
    exports: [ImageSizeDirective]
})
export class ImageSizeDirectiveModule {}
