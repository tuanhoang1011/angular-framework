import {
    AfterContentInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { sprintf } from 'sprintf-js';

import { BaseComponent } from '../../../core/components/base.component';
import { LogIdentiferFormat, LogSubType, LogType } from '../../../core/constants/log.const';
import { TabItem } from '../../../core/models/item.model';
import { LogService } from '../../../core/services/log/log.service';
import { isNullOrUndefined } from '../../../core/utils/common-func.ultility';
import { TemplateDirective } from '../../directives/template.directive';

@Component({
    selector: 'app-dynamic-tab-view',
    templateUrl: './dynamic-tab-view.component.html',
    styleUrls: ['./dynamic-tab-view.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicTabViewComponent extends BaseComponent implements OnInit, OnChanges, AfterContentInit {
    @ContentChildren(TemplateDirective) templates!: QueryList<TemplateDirective>;

    @Input() items: TabItem[] = [];
    @Input() queryParamKey: string = 'tab';
    @Input() styleClass: string = '';
    @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
    @Input() isWriteLog: boolean = true;

    @Output() onClickTab: EventEmitter<TabItem> = new EventEmitter();
    @Output() onReady: EventEmitter<boolean> = new EventEmitter();

    activeIdx: number = 0;

    constructor(
        private cdr: ChangeDetectorRef,
        private router: Router,
        private route: ActivatedRoute,
        private translateService: TranslateService,
        private logService: LogService
    ) {
        super();
    }

    ngOnInit(): void {
        // after redirect completely, set actived tab by url
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((res) => {
            this.activeTab();
        });

        this.activeTab();
    }

    ngAfterContentInit(): void {
        this.templates?.forEach((template) => {
            const tab = this.items.find((tab) => tab.id === template.appTemplate);

            if (tab) {
                tab.templateRef = template.templateRef;
            }
        });
        this.onReady.emit(true);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!isNullOrUndefined(changes['items']?.currentValue)) {
            this.cdr.markForCheck();
        }
    }

    tabById(index, tab) {
        return tab.id;
    }

    clickTab(event: { originalEvent: Event; index: number }) {
        const tab = this.items[event.index];

        if (tab.disabled) return;

        // write log
        if (this.isWriteLog) {
            this.logService.operation(LogType.Action, {
                subType: LogSubType.ScreenTransition,
                identifier: tab.label
                    ? sprintf(LogIdentiferFormat.Tab, this.translateService.instant(tab.label))
                    : undefined,
                destinationScreen: tab.screen
            });
        }

        this.items.forEach((x) => (x.activated = false));
        tab.activated = true;
        tab.rendered = true;
        this.onClickTab.emit(tab);

        this.router.navigate([], {
            queryParams: { tab: tab.id },
            queryParamsHandling: 'merge'
        });

        this.cdr.markForCheck();
    }

    private activeTab() {
        this.items.forEach((tab, idx) => {
            if (this.route.snapshot.queryParams[this.queryParamKey] === tab.id) {
                this.activeIdx = idx;
                tab.activated = true;
                tab.rendered = true;
            } else {
                tab.activated = false;
            }
        });

        // default
        if (this.items.length > 0 && this.items.every((x) => !x.activated)) {
            this.items[0].activated = true;
            this.items[0].rendered = true;
            this.activeIdx = 0;
        }
        this.cdr.markForCheck();
    }
}
