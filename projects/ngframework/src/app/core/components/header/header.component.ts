import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OverlayPanel } from 'primeng/overlaypanel';

import { environment } from '../../../../environments/environment';
import { CommonConstant } from '../../constants/common.const';
import { FormatTextType } from '../../constants/format-text.const';
import { StorageKey } from '../../constants/storage-key.const';
import { MenuItem } from '../../models/item.model';
import { LocalStorageService } from '../../services/local-storage.service';
import { GlobalVariables } from '../../utils/global-variables.ultility';
import { BaseComponent } from '../base.component';
import { SidebarService } from '../sidebar/sidebar.service';
import { HeaderService } from './header.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent extends BaseComponent implements OnInit {
    env = environment;
    navMenu: MenuItem[] = [];
    userMenu: MenuItem[] = [];
    languages: MenuItem[] = [];

    globalVar = GlobalVariables;
    formatTextEnum = FormatTextType;

    constructor(
        public sidebarService: SidebarService,
        private router: Router,
        private renderer2: Renderer2,
        private cdr: ChangeDetectorRef,
        private translateService: TranslateService,
        private localStorageService: LocalStorageService,
        private headerService: HeaderService
    ) {
        super();
    }

    ngOnInit(): void {
        try {
            this.getNavMenu();
            this.getUserMenu();
            this.getLanguages();
        } catch (error) {
            throw error;
        }
    }

    async getNavMenu() {
        try {
            this.navMenu = (await this.headerService.getNavMenu()).menu;
            this.cdr.markForCheck();
        } catch (error) {
            throw error;
        }
    }

    async getUserMenu() {
        try {
            this.userMenu = [
                {
                    id: 'profile',
                    label: 'LBL_0005',
                    click: () => {
                        // check later
                        // view user profile
                        console.log('View profile');
                    }
                },
                {
                    id: 'signout',
                    label: 'LBL_0007',
                    click: () => {
                        // check later
                        // sign out
                        console.log('Sign out');
                    }
                }
            ];
            this.cdr.markForCheck();
        } catch (error) {
            throw error;
        }
    }

    async getLanguages() {
        try {
            this.languages = (await this.headerService.getLanguages()).menu;
            this.cdr.markForCheck();
        } catch (error) {
            throw error;
        }
    }

    changeTheme() {
        try {
            let newTheme;
            if (GlobalVariables.theme === CommonConstant.Theme.Light.label) {
                newTheme = CommonConstant.Theme.Dark.label;
            } else {
                newTheme = CommonConstant.Theme.Light.label;
            }

            this.headerService.setTheme(GlobalVariables.theme, newTheme, this.renderer2);
            GlobalVariables.theme = newTheme;
        } catch (error) {
            throw error;
        }
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

    changeLanguage(langOpt: MenuItem, langRef: OverlayPanel) {
        try {
            if (langOpt && langOpt.id) {
                this.translateService.use(langOpt.id);
                GlobalVariables.language = langOpt.id;
                this.localStorageService.set(StorageKey.Language, langOpt.id);
            }

            langRef.hide();
        } catch (error) {
            throw error;
        }
    }

    clickSidebarMenu() {
        try {
            this.sidebarService.setSidebarStatus(!this.sidebarService.getStates.expandSidebar);
        } catch (error) {
            throw error;
        }
    }
}
