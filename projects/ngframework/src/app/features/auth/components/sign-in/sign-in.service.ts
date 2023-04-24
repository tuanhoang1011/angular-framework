import { Injectable } from '@angular/core';
import { HttpBaseService } from 'projects/ngframework/src/app/core/services/communicate-server/http-base.service';

// file path
const rootPath = '../../../../../assets/json/auth';
const signinForm = `${rootPath}/signin-form.json`;

@Injectable({ providedIn: 'root' })
export class SignInService {
    constructor(private httpBaseService: HttpBaseService) {}

    // getSigninFormJSON(): Observable<FormConfig> {
    //     return this.httpBaseService.getLocalFile(signinForm);
    // }
}
