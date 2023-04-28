import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    Renderer2,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';

import { ImageView } from '../../../core/models/image.model';
import { GlobalVariables } from '../../../core/utils/global-variables.ultility';

@Component({
    selector: 'app-image-carousel',
    templateUrl: './image-carousel.component.html',
    styleUrls: ['./image-carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCarouselComponent {
    @Input() images: ImageView[] = [];
    @Input() circular: boolean = false;
    @Input() numScroll: number = 1;
    @Input() numVisible: number = GlobalVariables.imageCarouselNumVisible;
    @Input() page: number = 1;
    @Input() showIndicators: boolean = true;
    @Input() showNavigators: boolean = true;
    @Input() styleClass!: string;
    @Input() contentClass!: string;
    @Input() indicatorStyleClass!: string;
    @Input() indicatorsContentClass!: string;
    @Input() responsiveOptions: any[] = [
        {
            breakpoint: '1400px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '1220px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '1100px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    @ViewChild('elRef', {
        read: ViewContainerRef,
        static: true
    })
    elRef!: ViewContainerRef;

    constructor(private cdr: ChangeDetectorRef, private renderer2: Renderer2) {}

    previewImage(isTurnOn: boolean) {
        const itemContainer = this.elRef.element.nativeElement.getElementsByClassName('p-carousel-items-container');
        // remove transform style to view image at preview mode
        setTimeout(() => {
            this.renderer2.setStyle(itemContainer[0] as ElementRef, 'transform', ``);
        }, 0);
    }
}
