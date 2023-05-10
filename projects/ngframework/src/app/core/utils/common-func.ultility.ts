import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isNull, isUndefined } from 'lodash';

import { environment } from '../../../environments/environment';
import { AppModule } from '../../app.module';
import { AuthRoutes, PublicRoutes } from '../constants/router.const';

export const isNullOrUndefined = (val) => {
    return isUndefined(val) || isNull(val);
};

export const showMessageDebug = (msg: string) => {
    if (environment.debugMode) console.log(msg);
};

export const isPublicPages = (router: Router) => {
    const authRoute = `${PublicRoutes.Auth}/`;
    const publicPage = [`${authRoute}${AuthRoutes.SignIn}`];

    return publicPage.some((url) => router.url.toLowerCase().includes(url.toLowerCase()));
};

export const bypassSecurityTrustUrl = (src: string | SafeUrl) => {
    return AppModule.injector.get(DomSanitizer).bypassSecurityTrustUrl(src.toString());
};
