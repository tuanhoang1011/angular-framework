import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { environment } from 'projects/ngframework/src/environments/environment';

import { CommonConstant } from '../../../constants/common.const';
import { StorageKey } from '../../../constants/storage-key.const';
import { FormatTextType } from '../../../enums/format-text.enum';
import { MenuItem } from '../../../models/item.model';
import { LocalStorageService } from '../../../services/storage/local-storage.service';
import { GlobalVariables } from '../../../utils/global-variables.ultility';
import { BaseComponent } from '../../base.component';
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
        this.getNavMenu();
        this.getUserMenu();
        this.getLanguages();
    }

    async getNavMenu() {
        this.navMenu = (await this.headerService.getNavMenu()).menu;
        this.cdr.markForCheck();
    }

    async getUserMenu() {
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
    }

    async getLanguages() {
        this.languages = (await this.headerService.getLanguages()).menu;
        this.cdr.markForCheck();
    }

    changeTheme() {
        let newTheme;
        if (GlobalVariables.theme === CommonConstant.Theme.Light.label) {
            newTheme = CommonConstant.Theme.Dark.label;
        } else {
            newTheme = CommonConstant.Theme.Light.label;
        }

        this.headerService.setTheme(GlobalVariables.theme, newTheme, this.renderer2);
        GlobalVariables.theme = newTheme;
    }

    clickMenu(selectedItem: MenuItem | { menu: MenuItem; subMenu: MenuItem }) {
        // select menu
        if (!(selectedItem as any).menu && (selectedItem as MenuItem).url) {
            this.router.navigateByUrl((selectedItem as MenuItem).url!);
        }

        // select submenu
        if ((selectedItem as any).menu && (selectedItem as any).subMenu.url) {
            this.router.navigateByUrl((selectedItem as any).subMenu.url);
        }
    }

    changeLanguage(langOpt: MenuItem, langRef: OverlayPanel) {
        if (langOpt && langOpt.id) {
            this.translateService.use(langOpt.id);
            GlobalVariables.language = langOpt.id;
            this.localStorageService.set(StorageKey.Language, langOpt.id);
        }

        langRef.hide();
    }

    clickSidebarMenu() {
        this.sidebarService.setSidebarStatus(!this.sidebarService.getStates.expandSidebar);
    }
}
