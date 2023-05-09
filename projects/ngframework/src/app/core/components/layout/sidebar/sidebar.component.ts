import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'projects/ngframework/src/environments/environment';
import { takeUntil } from 'rxjs';

import { CommonConstant } from '../../../constants/common.const';
import { MenuItem } from '../../../models/item.model';
import { BaseComponent } from '../../base.component';
import { SidebarService } from './sidebar.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent extends BaseComponent implements OnInit {
    constant = CommonConstant;
    env = environment;

    expanded = false;
    navMenu: MenuItem[] = [];

    constructor(private cdr: ChangeDetectorRef, private sidebarService: SidebarService) {
        super();
    }

    async ngOnInit() {
        this.listenState();
        this.navMenu = (await this.sidebarService.getNavMenu()).menu;
        this.cdr.markForCheck();
    }

    listenState() {
        this.sidebarService.expandSidebar$.pipe(takeUntil(this.destroy$)).subscribe((expanded) => {
            this.expanded = expanded;
            this.cdr.markForCheck();
        });
    }
}
