import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    Renderer2,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

import { CommonConstant } from '../../../core/constants/common.const';
import { LogSubType, LogType } from '../../../core/constants/log.const';
import { LogService } from '../../../core/services/log.service';
import { bypassSecurityTrustUrl } from '../../../core/utils/common-func.ultility';

@Component({
    selector: 'app-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageViewComponent implements OnInit {
    @Input() src?: string | SafeUrl;
    @Input() alt: string = '';
    @Input() styleClass?: string;
    @Input() height: number = CommonConstant.ImageRatio.Thumbnail.height;
    @Input() width: number = CommonConstant.ImageRatio.Thumbnail.width;
    @Input() previewMode: boolean = true;
    @Input() transformMode: boolean = true;
    @Output() onClickImageView: EventEmitter<boolean> = new EventEmitter<boolean>(false);
    @ViewChild('previewImgRef', {
        read: ViewContainerRef
    })
    private previewImgRef!: ViewContainerRef;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // 27: escapse
        if (event.keyCode === 27) {
            this.offPreviewMode();
        }
    }

    isShowingPreview: boolean = false;
    imgRatio = CommonConstant.ImageRatio;

    private degree = 0;
    private zoomRatio = 1;

    constructor(private cdr: ChangeDetectorRef, private logService: LogService, private renderer2: Renderer2) {}

    ngOnInit(): void {
        this.src = this.src ? bypassSecurityTrustUrl(this.src) : '';
    }

    clickImage() {
        try {
            if (!this.previewMode) return;

            this.isShowingPreview = true;
            this.cdr.markForCheck();

            this.renderer2.setStyle(document.body, 'overflow', 'hidden');
            this.onClickImageView.emit(true);
        } catch (error) {
            throw error;
        }
    }

    clickOutside(event) {
        try {
            if (event.srcElement.id === 'img-preview') {
                this.offPreviewMode();
            }
        } catch (error) {
            throw error;
        }
    }

    offPreviewMode() {
        try {
            this.renderer2.setStyle(document.body, 'overflow', 'auto');

            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.Button,
                identifier: 'Turn-off-image-preview-mode-button'
            });

            this.isShowingPreview = false;
            this.degree = 0;
            this.zoomRatio = 1;
            this.cdr.markForCheck();

            this.onClickImageView.emit(false);
        } catch (error) {
            throw error;
        }
    }

    rotate(isRight: boolean) {
        try {
            this.degree = this.degree + (isRight ? 90 : -90);
            this.setTransform();

            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.Button,
                identifier: `Rotate-${isRight ? 'right' : 'left'}-image-preview-mode-button`
            });

            this.cdr.markForCheck();
        } catch (error) {
            throw error;
        }
    }

    zoom(isZoomOut: boolean) {
        try {
            if ((isZoomOut && this.zoomRatio <= 0.5) || (!isZoomOut && this.zoomRatio >= 1.5)) return;

            this.zoomRatio = this.zoomRatio + (isZoomOut ? -0.1 : 0.1);
            this.setTransform();

            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.Button,
                identifier: `Zoom-${isZoomOut ? 'out' : 'in'}-image-preview-mode-button`
            });

            this.cdr.markForCheck();
        } catch (error) {
            throw error;
        }
    }

    private setTransform() {
        try {
            const previewedImgEl = this.previewImgRef.element.nativeElement;
            this.renderer2.setStyle(previewedImgEl, 'transform', `scale(${this.zoomRatio}) rotate(${this.degree}deg)`);
        } catch (error) {
            throw error;
        }
    }
}
