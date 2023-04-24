import { Router } from '@angular/router';
import { isNull, isUndefined } from 'lodash';
import { environment } from 'projects/ngframework/src/environments/environment';

import { AuthRoutes } from '../routers/auth.routes';
import { PublicLayoutRoutes } from '../routers/layout-public.routes';

export function isNullUndefined(val) {
    return isUndefined(val) && isNull(val);
}

export function isNullOrUndefined(val) {
    return isUndefined(val) || isNull(val);
}

export function showMessageDebug(msg: string) {
    if (environment.debugMode) console.log(msg);
}

export function isPublicPages(router: Router) {
    const authRoute = `${PublicLayoutRoutes.Auth}/`;
    const publicPage = [`${authRoute}${AuthRoutes.SignIn}`];

    return publicPage.some((url) => router.url.toLowerCase().includes(url.toLowerCase()));
}
