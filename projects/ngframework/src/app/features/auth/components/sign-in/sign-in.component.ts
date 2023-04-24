import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { BaseComponent } from 'projects/ngframework/src/app/core/components/base.component';
import { LoadingService } from 'projects/ngframework/src/app/core/components/loading/loading.service';
import { LogActiveScreen } from 'projects/ngframework/src/app/core/constants/log.const';
import { SignInRequest } from 'projects/ngframework/src/app/core/models/auth.model';
import { AuthBaseService } from 'projects/ngframework/src/app/core/services/auth/auth-base.service';
import { focusError } from 'projects/ngframework/src/app/core/utils/form.ultility';
import { GlobalVariables } from 'projects/ngframework/src/app/core/utils/global-variables.ultility';
import { Observable } from 'rxjs';

import { SignInService } from './sign-in.service';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class SignInComponent extends BaseComponent implements OnInit {
    @ViewChild('signinForm') signinForm?: DynamicFormComponent;

    mode = FormModeType.Create as FormMode;
    isInitialLoadPage: boolean = true;
    globalVar = GlobalVariables;

    // Observable
    signinConfig$?: Observable<FormConfig>;

    constructor(
        public authService: AuthBaseService,
        private signinService: SignInService,
        private loadingService: LoadingService,
        private cdr: ChangeDetectorRef
    ) {
        super(LogActiveScreen.SignIn);
    }

    ngOnInit(): void {
        if (this.globalVar.isMobile && this.isInitialLoadPage) {
            setTimeout(() => {
                this.signinConfig$ = this.signinService.getSigninFormJSON();
                this.cdr.markForCheck();
                this.isInitialLoadPage = false;
            }, 500);
        } else {
            this.signinConfig$ = this.signinService.getSigninFormJSON();
        }
    }

    async onSubmit() {
        await this.signinForm?.checkError();
        focusError();

        if (this.signinForm?.formValid) {
            const model: SignInRequest = {
                username: this.signinForm.getControl('username')?.value.trim(),
                password: this.signinForm.getControl('password')?.value.trim()
            };
            this.loadingService.show();
            this.authService.signIn(model, this.cdr);
        }
    }
}
