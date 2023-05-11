import { Location } from '@angular/common';
import { HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LogActiveScreen } from '../../constants/log.const';
import { AppRoutes } from '../../constants/router.const';
import { GlobalStateService } from '../../services/global-state.service';
import { BaseComponent } from '../base.component';

@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorPageComponent extends BaseComponent implements OnInit {
    error: { code: number; title: string; msg: string; isShowBackBtn?: boolean; isShowHomeBtn?: boolean } = {
        code: undefined!,
        title: '',
        msg: '',
        isShowBackBtn: false,
        isShowHomeBtn: false
    };

    constructor(
        private cdr: ChangeDetectorRef,
        private globalStateService: GlobalStateService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute
    ) {
        super(LogActiveScreen.ErrorPage);
    }

    ngOnInit(): void {
        this.snapshotError();
    }

    override ngOnDestroy(): void {
        this.globalStateService.setErrorPage(undefined);
    }

    back() {
        this.location.back();
    }

    goHome() {
        this.router.navigate([AppRoutes.Public]);
    }

    private snapshotError() {
        const errCode = this.route.snapshot.params['code'];
        this.error = {
            code: errCode,
            title: `ERRPAGE.${errCode}.TITLE`,
            msg: `ERRPAGE.${errCode}.MSG`
        };

        switch (errCode) {
            case HttpStatusCode.BadRequest:
                this.error = {
                    ...this.error,
                    isShowBackBtn: true,
                    isShowHomeBtn: false
                };
                break;

            case HttpStatusCode.Forbidden:
                this.error = {
                    ...this.error,
                    isShowBackBtn: true,
                    isShowHomeBtn: true
                };
                break;

            case HttpStatusCode.NotFound:
                this.error = {
                    ...this.error,
                    isShowBackBtn: true,
                    isShowHomeBtn: true
                };
                break;

            case HttpStatusCode.InternalServerError:
                this.error = {
                    ...this.error,
                    isShowBackBtn: false,
                    isShowHomeBtn: false
                };
                break;
        }

        this.cdr.markForCheck();
    }
}
