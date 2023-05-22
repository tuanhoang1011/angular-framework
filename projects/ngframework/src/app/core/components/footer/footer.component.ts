import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { CommonConstant } from '../../constants/common.const';
import { MenuItem } from '../../models/item.model';
import { BaseComponent } from '../base.component';
import { FooterService } from './footer.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent extends BaseComponent implements OnInit {
    navMenu: MenuItem[] = [];
    constant = CommonConstant;

    constructor(private router: Router, private cdr: ChangeDetectorRef, private footerService: FooterService) {
        super();
    }

    async ngOnInit() {
        this.navMenu = (await this.footerService.getNavMenu()).menu;
        this.cdr.markForCheck();
    }

    clickMenu(selectedItem: MenuItem) {
        try {
            if (selectedItem.url) {
                this.router.navigateByUrl[selectedItem.url];
            }
        } catch (error) {
            throw error;
        }
    }
}
