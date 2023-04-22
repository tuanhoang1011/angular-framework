import { isNull, isUndefined } from 'lodash';

export function isNullUndefined(val) {
    return isUndefined(val) && isNull(val);
}

export function isNullOrUndefined(val) {
    return isUndefined(val) || isNull(val);
}
