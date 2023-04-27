import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isNull, isUndefined } from 'lodash';
import { environment } from 'projects/ngframework/src/environments/environment';

import { AppModule } from '../../app.module';
import { AuthRoutes } from '../routers/auth.routes';
import { PublicRoutes } from '../routers/public.routes';

export function isNullOrUndefined(val) {
    return isUndefined(val) || isNull(val);
}

export function showMessageDebug(msg: string) {
    if (environment.debugMode) console.log(msg);
}

export function isPublicPages(router: Router) {
    const authRoute = `${PublicRoutes.Auth}/`;
    const publicPage = [`${authRoute}${AuthRoutes.SignIn}`];

    return publicPage.some((url) => router.url.toLowerCase().includes(url.toLowerCase()));
}

export function bypassSecurityTrustUrl(src: string | SafeUrl) {
    return AppModule.injector.get(DomSanitizer).bypassSecurityTrustUrl(src.toString());
}
