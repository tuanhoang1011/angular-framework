import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { sprintf } from 'sprintf-js';

import { LogIdentiferFormat, LogSubType, LogType } from '../../constants/log.const';
import { BreadcrumbItem, BreadcrumbItemList } from '../../models/breadcrumb.model';
import { LogService } from '../../services/log/log.service';
import { BaseComponent } from '../base.component';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent extends BaseComponent implements OnInit {
    items: BreadcrumbItem[] = [];

    constructor(
        private router: Router,
        private cdr: ChangeDetectorRef,
        private translateService: TranslateService,
        private logService: LogService,
        private breadcrumbService: BreadcrumbService
    ) {
        super();
    }

    ngOnInit() {
        this.breadcrumbService.breadcrumb$.subscribe((res: BreadcrumbItemList) => {
            this.items = res.items ?? [];
            this.cdr.markForCheck();
        });
    }

    redirectPage(item: BreadcrumbItem) {
        if (item.url) {
            // write log
            this.logService.operation(LogType.Action, {
                subType: LogSubType.ScreenTransition,
                identifier: sprintf(LogIdentiferFormat.Breadcrumb, this.translateService.instant(item.label!)),
                destinationScreen: item.destinationScreen
            });

            this.router.navigate([item.url]);
        }
    }

    breadcrumbById(index, bc) {
        return bc.id;
    }
}
