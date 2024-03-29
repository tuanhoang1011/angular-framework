import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { takeUntil } from 'rxjs';

import { BaseComponent } from './core/components/base.component';
import { HeaderService } from './core/components/header/header.service';
import { LoadingService } from './core/components/loading/loading.service';
import { SplashScreenService } from './core/components/splash-screen/splash-screen.service';
import { StorageKey } from './core/constants/storage-key.const';
import { AuthService } from './core/services/auth.service';
import { AutoSignOutService } from './core/services/auto-signout.service';
import { ConfigService } from './core/services/config.service';
import { GlobalStateService } from './core/services/global-state.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { LogService } from './core/services/log.service';
import { GlobalVariables } from './core/utils/global-variables.ultility';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent extends BaseComponent implements OnInit {
    @ViewChild('appContainer', {
        read: ViewContainerRef,
        static: true
    })
    appContainerRef!: ViewContainerRef;

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(e: KeyboardEvent) {
        // prevent input when loading is showing
        if (this.loadingService.getStates.loadingOn) {
            e.preventDefault();
        }
    }

    constructor(
        private headerService: HeaderService,
        private router: Router,
        private renderer2: Renderer2,
        private loadingService: LoadingService,
        private translateService: TranslateService,
        private primeNGConfig: PrimeNGConfig,
        private configService: ConfigService,
        private autoSignOutService: AutoSignOutService,
        private authService: AuthService,
        private globalStateService: GlobalStateService,
        private logService: LogService,
        private splashScreenService: SplashScreenService,
        private localStorageService: LocalStorageService
    ) {
        super();
    }

    ngOnInit(): void {
        try {
            // get config from local file
            this.configService.loadConfig(this.destroy$).then(() => {
                this.applyConfig();

                // start automatically signing out
                this.autoSignOutService.init();

                // user signed out at other tab (same browser) -> will sign out at current tab
                window.addEventListener('storage', this.onStorageChange, false);

                // already signed in
                if (this.authService.isSignedInSession) {
                    this.authService.isSignedOutSession = this.authService.signedOutCurrentTab = false;
                }

                this.globalStateService.setAppContainerRef(this.appContainerRef);
            });
        } catch (error) {
            throw error;
        }
    }

    override ngOnDestroy(): void {
        super.ngOnDestroy();
        window.removeEventListener('storage', this.onStorageChange, false);
    }

    private onStorageChange = async (e: StorageEvent) => {
        try {
            if (e.newValue) {
                // user signed out at other tab (same browser) -> will sign out at current tab
                const isDiffSignedOut = this.authService.isSignedOutSession !== this.authService.signedOutCurrentTab;

                if (this.authService.isSignedInSession && !this.authService.signedOutCurrentTab && isDiffSignedOut) {
                    await this.authService.signOut();

                    return;
                }
            }
        } catch (error) {
            throw error;
        }
    };

    private applyConfig() {
        setTimeout(() => {
            this.splashScreenService.hide();
        }, GlobalVariables.splashScreenDurationMilSecond);

        let language = this.localStorageService.get(StorageKey.Language);
        let theme = this.localStorageService.get(StorageKey.Theme);

        if (language === '') {
            this.localStorageService.set(StorageKey.Language, GlobalVariables.defaultLanguage);
            language = GlobalVariables.defaultLanguage;
        }

        if (theme === '') {
            this.localStorageService.set(StorageKey.Theme, GlobalVariables.defaultTheme);
            theme = GlobalVariables.defaultTheme;
        }

        GlobalVariables.language = language;
        GlobalVariables.theme = theme;

        this.translateService.setDefaultLang(GlobalVariables.language);
        this.translateService
            .stream('primeng')
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => this.primeNGConfig.setTranslation(res));

        this.headerService.setTheme('', theme, this.renderer2);
    }
}
