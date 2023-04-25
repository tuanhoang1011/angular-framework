import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Amplify } from 'aws-amplify';
import { PrimeNGConfig } from 'primeng/api';
import { takeUntil } from 'rxjs';

import { environment } from '../environments/environment';
import { BaseComponent } from './core/components/base.component';
import { LoadingService } from './core/components/loading/loading.service';
import { MessageDialogService } from './core/components/message-dialog/message-dialog.service';
import { MessageToastService } from './core/components/message-toast/message-toast.service';
import { AuthBaseService } from './core/services/auth/auth-base.service';
import { AutoSignOutService } from './core/services/auth/auto-signout.service';
import { ConfigService } from './core/services/common/config.service';
import { WebSocketService } from './core/services/communicate-server/web-socket.service';
import { LogService } from './core/services/log/log.service';
import { GlobalStateService } from './core/services/state-management/component-store/global-state.service';
import { GlobalVariables } from './core/utils/global-variables.ultility';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent extends BaseComponent implements OnInit {
    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // prevent input when loading is showing
        if (this.loadingService.isShown) {
            event.preventDefault();
        }
    }

    constructor(
        private router: Router,
        private msgToastService: MessageToastService,
        private msgDialogService: MessageDialogService,
        private loadingService: LoadingService,
        private translateService: TranslateService,
        private primeNGConfig: PrimeNGConfig,
        private configService: ConfigService,
        private wsService: WebSocketService,
        private autoSignOutService: AutoSignOutService,
        private authService: AuthBaseService,
        private globalStateService: GlobalStateService,
        private logService: LogService
    ) {
        super();

        try {
            // set configuration for aws appsync
            Amplify.configure(environment.aws_appsync);

            // get config from local file
            this.configService.loadConfig(this.destroy$).then(() => {
                this.translateService.setDefaultLang(GlobalVariables.defaultLanguage);
                this.translateService.get('primeng').subscribe((res) => this.primeNGConfig.setTranslation(res));
            });
        } catch (error) {
            throw error;
        }
    }

    ngOnInit(): void {
        try {
            // start automatically signing out
            this.autoSignOutService.init();

            this.listenGlobalState();

            // user signed out at other tab (same browser) -> will sign out at current tab
            window.addEventListener('storage', this.onStorageChange, false);

            // already signed in
            if (this.authService.isSignedInSession) {
                this.authService.isSignedOutSession = this.authService.signedOutCurrentTab = false;
            }

            this.example();
        } catch (error) {
            throw error;
        }
    }

    private listenGlobalState() {
        this.globalStateService.vm$.pipe(takeUntil(this.destroy$)).subscribe({
            next: (res) => {
                // set active screen/dialog for writing log
                this.logService.screenIdentifer = res.activeDialog || res.activeScreen;
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

    async example() {
        setTimeout(() => {
            this.globalStateService.setActiveScreen('Screen');
            this.globalStateService.setActiveDialog('Dialog');
        }, 2000);

        // await this.wsService.initWebSocket();
        // setTimeout(() => {
        //     this.wsService.disconnect();
        // }, 2000);
        // this.wsService.receive<any>().subscribe({
        //     next: (res) => {
        //         console.log(res.data);
        //     }
        // });
        // check later
        // setTimeout(() => {
        //     this.msgToastService.success('MSG.APP_ERR0001', {
        //         header: 'MSG.TITLE_001',
        //         variables: ['Tuan', 'ABC'],
        //         contentStyleClass: 'contentStyleClass',
        //         detailStyleClass: 'detailStyleClass'
        //     });
        //     this.msgToastService.info('MSG.APP_ERR0001', {
        //         header: 'MSG.TITLE_001',
        //         variables: ['Tuan', 'ABC'],
        //         contentStyleClass: 'contentStyleClass',
        //         detailStyleClass: 'detailStyleClass'
        //     });
        //     this.msgToastService.warn('MSG.APP_ERR0001', {
        //         header: 'MSG.TITLE_001',
        //         variables: ['Tuan', 'ABC'],
        //         contentStyleClass: 'contentStyleClass',
        //         detailStyleClass: 'detailStyleClass'
        //     });
        //     this.msgToastService.error('MSG.APP_ERR0001', {
        //         header: 'MSG.TITLE_001',
        //         variables: ['Tuan', 'ABC'],
        //         contentStyleClass: 'contentStyleClass',
        //         detailStyleClass: 'detailStyleClass'
        //     });
        // }, 200);
        // this.msgDialogService.success(
        //     'MSG.APP_ERR0001',
        //     {
        //         header: 'MSG.TITLE_001',
        //         variables: ['Tuan', 'ABC'],
        //         styleClass: 'styleClass',
        //         contentStyleClass: 'contentStyleClass',
        //         detailStyleClass: 'detailStyleClass'
        //     },
        //     () => {
        //         console.log('yes');
        //     }
        //     // () => {
        //     //     console.log('no');
        //     // },
        //     // () => {
        //     //     console.log('cancel');
        //     // }
        // );
        // this.msgDialogService.confirm(
        //     'MSG.APP_ERR0001',
        //     {
        //         header: 'MSG.TITLE_001',
        //         variables: ['Tuan', 'ABC'],
        //         contentStyleClass: 'contentStyleClass',
        //         detailStyleClass: 'detailStyleClass'
        //         // actions: [
        //         //     {
        //         //         label: 'BTN_0005',
        //         //         styleClass: 'btn-danger',
        //         //         click: () => {
        //         //             console.log('Btn 1');
        //         //         }
        //         //     },
        //         //     {
        //         //         label: 'BTN_0005',
        //         //         styleClass: 'btn-danger'
        //         //     }
        //         // ]
        //     },
        //     () => {
        //         console.log('yes');
        //     }
        //     // () => {
        //     //     console.log('no');
        //     // }
        //     // () => {
        //     //     console.log('cancel');
        //     // }
        // );
    }
}
