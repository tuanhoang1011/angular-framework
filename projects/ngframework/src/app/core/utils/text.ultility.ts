import { keys } from 'lodash';
import { sprintf } from 'sprintf-js';

import { LogIdentiferFormat } from '../constants/log.const';

// trim field with check undefined
export function trimField(value: string) {
    try {
        return value ? String(value).trim() : '';
    } catch (error) {
        throw error;
    }
}

// trim all properties in object
export function trimObj(obj: any, exceptionList: Array<string> = [], exceptionTrimEmptyList: Array<string> = []) {
    try {
        keys(obj).forEach((element) => {
            if (
                (obj[element] === '' ||
                    obj[element] === undefined ||
                    obj[element] === null ||
                    (Array.isArray(obj[element]) && obj[element].length === 0)) &&
                !exceptionTrimEmptyList.some((x) => x === element)
            ) {
                delete obj[element];
            }
            if (typeof obj[element] === 'string' && trimField(obj[element]) === '') {
                delete obj[element];
            }
            if (typeof obj[element] === 'string' && !exceptionList.some((x) => x === element)) {
                // type of field is string and not exist in exception list
                obj[element] = trimField(obj[element]);
            }
        });
    } catch (error) {
        throw error;
    }
}

// trim field with check undefined
export function trimFieldTextArea(value: string) {
    try {
        return value ? value.trim() : '';
    } catch (error) {
        throw error;
    }
}

// trim HTML with check undefined
export function trimHTML(value: string) {
    try {
        const regEmtyPtag = new RegExp('<p[^>]*>(\\s|)+<\\/p[^>]*>', 'g');

        if (value) {
            value = value.replace(/<br>|<br\/>|&nbsp;/g, '');
            value = value.replace(regEmtyPtag, '').trim();
        }

        return value;
    } catch (error) {
        throw error;
    }
}

// trim all free space
export function trimAllSpaces(value: string) {
    try {
        return value ? value.trim().replace(/\s+/g, ' ') : '';
    } catch (error) {
        throw error;
    }
}

// trim all properties in object
export function trimSearchObj(obj: any, exceptionList: Array<string> = [], exceptionTrimEmptyList: Array<string> = []) {
    try {
        keys(obj).forEach((element) => {
            if (typeof obj[element] === 'string' && !exceptionList.some((x) => x === element)) {
                // type of field is string and not exist in exception list
                obj[element] = trimField(obj[element]);
            }
        });
    } catch (error) {
        throw error;
    }
}

// generate table item id
export function generateTableItemID(tableName: string, itemKey: string, itemData: string | number | undefined) {
    try {
        return sprintf(LogIdentiferFormat.TableItem, tableName, itemKey, itemData);
    } catch (error) {
        throw error;
    }
}
