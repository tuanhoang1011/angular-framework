import { ChangeDetectionStrategy, Component, HostListener, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

import { BaseComponent } from './core/components/base.component';
import { LoadingService } from './core/components/loading/loading.service';
import { MessageDialogService } from './core/components/message-dialog/message-dialog.service';
import { MessageToastService } from './core/components/message-toast/message-toast.service';
import { ConfigService } from './core/services/common/config.service';
import { GlobalVariables } from './core/utils/global-variables.ultility';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent extends BaseComponent {
    title = 'NGFramework';

    @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        // prevent input when loading is showing
        if (this.loadingService.isShown) {
            event.preventDefault();
        }
    }

    constructor(
        private msgToastService: MessageToastService,
        private msgDialogService: MessageDialogService,
        private loadingService: LoadingService,
        private translateService: TranslateService,
        private primeNGConfig: PrimeNGConfig,
        private configService: ConfigService
    ) {
        super();

        this.configService.loadConfig().then((res) => {
            this.translateService.setDefaultLang(GlobalVariables.defaultLanguage);
        });
        this.translateService.get('primeng').subscribe((res) => this.primeNGConfig.setTranslation(res));

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
