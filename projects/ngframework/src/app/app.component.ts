import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

import { MessageDialogService } from './core/components/message-dialog/message-dialog.service';
import { MessageToastService } from './core/components/message-toast/message-toast.service';
import { ConfigService } from './core/services/common/config.service';
import { GlobalVariables } from './core/utils/global-variables.ultility';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    title = 'NGFramework';

    constructor(
        private msgToastService: MessageToastService,
        private msgDialogService: MessageDialogService,
        private translate: TranslateService,
        private primeNGConfig: PrimeNGConfig,
        private configService: ConfigService
    ) {
        this.configService.loadConfig().then((res) => {
            this.translate.setDefaultLang(GlobalVariables.defaultLanguage);
        });
        this.translate.get('primeng').subscribe((res) => this.primeNGConfig.setTranslation(res));

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

        this.msgDialogService.confirm(
            'MSG.APP_ERR0001',
            {
                header: 'MSG.TITLE_001',
                variables: ['Tuan', 'ABC'],
                contentStyleClass: 'contentStyleClass',
                detailStyleClass: 'detailStyleClass'
                // actions: [
                //     {
                //         label: 'BTN_0005',
                //         styleClass: 'btn-danger',
                //         click: () => {
                //             console.log('Btn 1');
                //         }
                //     },
                //     {
                //         label: 'BTN_0005',
                //         styleClass: 'btn-danger'
                //     }
                // ]
            },
            () => {
                console.log('yes');
            }
            // () => {
            //     console.log('no');
            // }
            // () => {
            //     console.log('cancel');
            // }
        );
    }
}
