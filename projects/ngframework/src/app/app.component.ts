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
import { Amplify } from 'aws-amplify';
import { PrimeNGConfig } from 'primeng/api';
import { takeUntil } from 'rxjs';

import { environment } from '../environments/environment';
import { BaseComponent } from './core/components/base.component';
import { HeaderService } from './core/components/layout/header/header.service';
import { LoadingService } from './core/components/layout/loading/loading.service';
import { SplashScreenService } from './core/components/layout/splash-screen/splash-screen.service';
import { LogActiveScreen, LogSubType, LogType } from './core/constants/log.const';
import { AppRoutes } from './core/constants/router.const';
import { StorageKey } from './core/constants/storage-key.const';
import { AuthBaseService } from './core/services/auth/auth-base.service';
import { AutoSignOutService } from './core/services/auth/auto-signout.service';
import { ConfigService } from './core/services/common/config.service';
import { LogService } from './core/services/log/log.service';
import { GlobalStateService } from './core/services/state-manager/component-store/global-state.service';
import { LocalStorageService } from './core/services/storage/local-storage.service';
import { isNullOrUndefined } from './core/utils/common-func.ultility';
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
    handleKeyboardEvent(event: KeyboardEvent) {
        // prevent input when loading is showing
        if (this.loadingService.getStates.loadingOn) {
            event.preventDefault();
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
        private authService: AuthBaseService,
        private globalStateService: GlobalStateService,
        private logService: LogService,
        private splashScreenService: SplashScreenService,
        private localStorageService: LocalStorageService
    ) {
        super();

        try {
            // set configuration for aws appsync
            Amplify.configure(environment.aws_appsync);

            // get config from local file
            this.configService.loadConfig(this.destroy$).then(() => {
                this.applyConfig();
            });
        } catch (error) {
            throw error;
        }
    }

    ngOnInit(): void {
        try {
            // start automatically signing out
            this.autoSignOutService.init();

            this.listenState();

            // user signed out at other tab (same browser) -> will sign out at current tab
            window.addEventListener('storage', this.onStorageChange, false);

            // already signed in
            if (this.authService.isSignedInSession) {
                this.authService.isSignedOutSession = this.authService.signedOutCurrentTab = false;
            }

            this.globalStateService.setAppContainerRef(this.appContainerRef);
        } catch (error) {
            throw error;
        }
    }

    private listenState() {
        this.globalStateService.vm$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            try {
                // set active screen/dialog for writing log
                this.logService.screenIdentifer = res.activeDialog || res.activeScreen;
            } catch (error) {
                throw error;
            }
        });

        this.globalStateService.errorPage$.pipe(takeUntil(this.destroy$)).subscribe((errCode) => {
            try {
                if (!isNullOrUndefined(errCode)) {
                    // write log
                    this.logService.operation(LogType.Action, {
                        subType: LogSubType.ScreenTransition,
                        destinationScreen: LogActiveScreen.ErrorPage
                    });

                    this.router.navigate([AppRoutes.Error]);
                }
            } catch (error) {
                throw error;
            }
        });
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
