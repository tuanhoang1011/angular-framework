import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Input,
    OnInit,
    Renderer2,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

import { CommonConstant } from '../../../core/constants/common.const';
import { LogSubType, LogType } from '../../../core/constants/log.const';
import { LogService } from '../../../core/services/log/log.service';
import { GlobalStateService } from '../../../core/services/state-manager/component-store/global-state.service';
import { bypassSecurityTrustUrl } from '../../../core/utils/common-func.ultility';

@Component({
    selector: 'app-image-view',
    templateUrl: './image-view.component.html',
    styleUrls: ['./image-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageViewComponent implements OnInit {
    @Input() src!: string | SafeUrl;
    @Input() styleClass!: string;
    @Input() height: number = CommonConstant.ImageRatio.PreviewMode.height;
    @Input() width: number = CommonConstant.ImageRatio.PreviewMode.width;
    @Input() fullMode: boolean = true;
    @ViewChild('fullImg', {
        read: ViewContainerRef,
        static: true
    })
    private fullImgRef!: ViewContainerRef;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // 27: escapse
        if (event.keyCode === 27) {
            this.offFullMode();
        }
    }

    isShowingFull: boolean = false;
    imgRatio = CommonConstant.ImageRatio;

    private imgFullEl: any;
    private appContainerEl = this.globalStateService.getStates.appContainerRef?.element.nativeElement;

    constructor(
        private cdr: ChangeDetectorRef,
        private logService: LogService,
        private renderer2: Renderer2,
        private globalStateService: GlobalStateService
    ) {}

    ngOnInit(): void {
        this.src = bypassSecurityTrustUrl(this.src);
        this.imgFullEl = this.fullImgRef.element.nativeElement;
    }

    clickImage() {
        try {
            if (!this.fullMode) return;

            this.isShowingFull = true;
            this.cdr.markForCheck();

            this.renderer2.setStyle(document.body, 'overflow', 'hidden');
            this.renderer2.removeClass(this.imgFullEl, 'hidden');
            this.appContainerEl.prepend(this.imgFullEl);
        } catch (error) {
            throw error;
        }
    }

    offFullMode() {
        try {
            this.renderer2.setStyle(document.body, 'overflow', 'auto');

            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.Button,
                identifier: 'Turn-off-image-full-mode-button'
            });

            this.isShowingFull = false;
            this.cdr.markForCheck();
            this.imgFullEl.remove();
        } catch (error) {
            throw error;
        }
    }
}
