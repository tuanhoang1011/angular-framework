import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { cloneDeep } from 'lodash';
import { environment } from 'projects/ngframework/src/environments/environment';
import { takeUntil } from 'rxjs';

import { BaseComponent } from '../../core/components/base.component';
import { DialogManagerService } from '../../core/components/dialog-manager/dialog-manager.service';
import { LoadingService } from '../../core/components/loading/loading.service';
import { MessageDialogService } from '../../core/components/message-dialog/message-dialog.service';
import { MessageToastService } from '../../core/components/message-toast/message-toast.service';
import { SplashScreenService } from '../../core/components/splash-screen/splash-screen.service';
import { CommonConstant } from '../../core/constants/common.const';
import { DialogInfo } from '../../core/models/common.model';
import { ImageView } from '../../core/models/image.model';
import { GlobalState } from '../../core/models/state.model';
import { GlobalStateService } from '../../core/services/state-manager/component-store/global-state.service';
import { IndexedDBService } from '../../core/services/storage/indexed-db.service';
import { GlobalVariables } from '../../core/utils/global-variables.ultility';
import { DialogAComponent } from './dialog-a/dialog-a.component';
import { DialogAService } from './dialog-a/dialog-a.service';
import { DialogBComponent } from './dialog-b/dialog-b.component';

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExampleComponent extends BaseComponent {
    imgRatio = CommonConstant.ImageRatio;
    thumbnailImages: ImageView[] = [];

    constructor(
        private dialogService: DialogManagerService,
        private dialogAService: DialogAService,
        private globalStateService: GlobalStateService,
        private msgToastService: MessageToastService,
        private msgDialogService: MessageDialogService,
        private translateService: TranslateService,
        private LoadingService: LoadingService,
        private splashScreenService: SplashScreenService,
        private indexedDBService: IndexedDBService,
        private router: Router,
        private cdr: ChangeDetectorRef
    ) {
        super('Example Page');

        this.dialogService.closedDialog$.pipe(takeUntil(this.destroy$)).subscribe((res) => {
            if (res) {
                console.log(res);
            }
        });

        for (let i = 0; i < 20; i++) {
            this.thumbnailImages.push({
                src: '../../../assets/images/dummy-angular.png',
                width: CommonConstant.ImageRatio.Thumbnail.width,
                height: CommonConstant.ImageRatio.Thumbnail.width
            });
        }
        this.thumbnailImages = cloneDeep(this.thumbnailImages);
        this.cdr.markForCheck();
    }

    clickButton(type: 'Primary' | 'Secondary' | 'Danger') {
        alert(`Click ${type} button`);
    }

    clickHyperlink() {
        window.open('https://www.google.com/', '_blank');
    }

    openDialogA() {
        const dialog: DialogInfo = {
            dialogId: 'Dialog A',
            component: DialogAComponent
        };

        this.dialogService.open(dialog);

        this.dialogAService.updateState({ activeDialog: 'A', activeScreen: 'A' } as GlobalState);
    }

    openDialogB() {
        const dialog: DialogInfo = {
            dialogId: 'Dialog B',
            component: DialogBComponent
        };

        this.dialogService.open(dialog);
    }

    updateDialogA() {
        this.dialogAService.updateState({ activeDialog: 'B', activeScreen: 'B' } as GlobalState);
    }

    removeDialogA() {
        this.dialogService.close('Dialog A');
    }

    redirectErrorPage(code: number) {
        this.globalStateService.setErrorPage(code);
    }

    showMessageToast(type: string) {
        switch (type) {
            case 'success':
                this.msgToastService.success('MSG.EXAMPLE_ERR0001', {
                    variables: ['Angular', 'ReactJS']
                });
                break;

            case 'error':
                this.msgToastService.error('MSG.EXAMPLE_ERR0001', {
                    variables: ['Angular', 'ReactJS']
                });
                break;

            case 'info':
                this.msgToastService.info('MSG.EXAMPLE_ERR0001', {
                    variables: ['Angular', 'ReactJS']
                });
                break;

            case 'warn':
                this.msgToastService.warn('MSG.EXAMPLE_ERR0001', {
                    variables: ['Angular', 'ReactJS']
                });
                break;

            default:
                this.msgToastService.clear();
                break;
        }
    }

    showMessageDialog(type: string) {
        switch (type) {
            case 'success':
                this.msgDialogService.success(
                    'MSG.EXAMPLE_ERR0001',
                    {
                        variables: ['Angular', 'ReactJS']
                    },
                    () => {
                        alert('Click Close');
                    }
                );
                break;

            case 'error':
                this.msgDialogService.error(
                    'MSG.EXAMPLE_ERR0001',
                    {
                        variables: ['Angular', 'ReactJS']
                    },
                    () => {
                        alert('Click Close');
                    }
                );
                break;

            case 'info':
                this.msgDialogService.info(
                    'MSG.EXAMPLE_ERR0001',
                    {
                        variables: ['Angular', 'ReactJS']
                    },
                    () => {
                        alert('Click Close');
                    }
                );
                break;

            case 'warn':
                this.msgDialogService.warn(
                    'MSG.EXAMPLE_ERR0001',
                    {
                        variables: ['Angular', 'ReactJS']
                    },
                    () => {
                        alert('Click Close');
                    }
                );
                break;

            case 'confirm':
                this.msgDialogService.confirm(
                    'MSG.EXAMPLE_ERR0001',
                    {
                        variables: ['Angular', 'ReactJS']
                    },
                    () => {
                        alert('Click Yes');
                    },
                    () => {
                        alert('Click No');
                    },
                    () => {
                        alert('Click Cancel');
                    }
                );
                break;

            case 'custom':
                this.msgDialogService.custom('MSG.EXAMPLE_ERR0001', {
                    header: 'MSG.TITLE_001',
                    variables: ['Angular', 'ReactJS'],
                    actions: [
                        {
                            label: 'BTN_0005',
                            styleClass: 'btn-secondary',
                            click: () => {
                                alert(`Click ${this.translateService.instant('BTN_0005')}`);
                            }
                        },
                        {
                            label: 'BTN_0006',
                            styleClass: 'btn-danger',
                            click: () => {
                                alert(`Click ${this.translateService.instant('BTN_0006')}`);
                            }
                        },
                        {
                            label: 'BTN_0001',
                            styleClass: 'btn-primary',
                            isDefault: true,
                            click: () => {
                                alert(`Click ${this.translateService.instant('BTN_0001')}`);
                            }
                        }
                    ]
                });
                break;
        }
    }

    showLoadingSplashScreen(isLoading: boolean) {
        if (isLoading) {
            this.LoadingService.show();
        } else {
            this.splashScreenService.show();
        }

        setTimeout(() => {
            if (isLoading) {
                this.LoadingService.hide();
            } else {
                this.splashScreenService.hide();
            }
        }, GlobalVariables.splashScreenDurationMilSecond);
    }

    processLog(type: 'write' | 'push' | 'clear') {
        switch (type) {
            case 'write':
                let msg = 'Log function has:\n';
                msg += '+ 7 levels: All, Error, Operation, Info, Warn, Debug, Off\n';
                msg += '+ 2 type: Action, Error\n';
                msg +=
                    '+ 7 sub type: Hyperlink, Button, Table Item Selection, Menu, Screen Transittion, API Error, Exception\n';
                msg +=
                    '+ Logs will write to indexed db of browser (Open Developer Tools -> Application -> Indexed DB)\n';
                msg +=
                    '+ Example: If you click on any button. A log information includes Operation (Level), Action (Type), Button (Sub type) will be saved into Indexed DB.\n';
                msg += '+ If you want more information. Please check source code: LogService (log.service.ts)';
                this.msgDialogService.info(msg);
                break;

            case 'push':
                this.msgDialogService.info('The time that you push log to server will depend on your requirements.');
                break;

            case 'clear':
                this.indexedDBService.clear(environment.storage.indexedDB.log.objectStore);
                this.msgDialogService.info('Current logs are cleared. Please check Indexed DB.');
                break;
        }
    }
}
