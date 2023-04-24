import { isNull, isUndefined } from 'lodash';
import { environment } from 'projects/ngframework/src/environments/environment';

export function isNullUndefined(val) {
    return isUndefined(val) && isNull(val);
}

export function isNullOrUndefined(val) {
    return isUndefined(val) || isNull(val);
}

export function showMessageDebug(msg: string) {
    if (environment.debugMode) console.log(msg);
}
