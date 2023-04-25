import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { format, fromUnixTime } from 'date-fns';
import { floor, replace } from 'lodash';
import { sprintf } from 'sprintf-js';

import { CommonConstant } from '../../core/constants/common.const';
import { FormatTextType } from '../../core/enums/format-text.enum';
import { FormBase } from '../../core/models/form-basic.model';
import { isNullOrUndefined } from '../../core/utils/common-func.ultility';

@Pipe({
    name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {
    constructor(private translateService: TranslateService) {}

    transform(data: any, config: FormBase): string {
        if (isNullOrUndefined(data)) {
            return data;
        }

        switch (config?.formatTextType) {
            case FormatTextType.PhoneNumber:
                return data ? data.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1-$2-$3') : data;

            case FormatTextType.DateTime:
                try {
                    if (!data && config.dateDefault) {
                        return format(CommonConstant.DefaultDate, 'yyyy-MM-dd HH:mm');
                    } else if (data) {
                        return format(this.parseDateByType(data), 'yyyy-MM-dd HH:mm');
                    } else {
                        return '';
                    }
                } catch (error) {
                    return '';
                }

            case FormatTextType.Date:
                try {
                    if (!data && config.dateDefault) {
                        return format(CommonConstant.DefaultDate, 'yyyy-MM-dd');
                    } else if (data) {
                        return format(this.parseDateByType(data), 'yyyy-MM-dd');
                    } else {
                        return '';
                    }
                } catch (error) {
                    return '';
                }

            case FormatTextType.Time:
                try {
                    if (!data && config.dateDefault) {
                        return format(CommonConstant.DefaultDate, 'HH:mm');
                    } else if (data) {
                        return format(this.parseDateByType(data), 'yyyy-MM-dd');
                    } else {
                        return '';
                    }
                } catch (error) {
                    return '';
                }

            case FormatTextType.Gender:
                try {
                    return this.translateService.instant(
                        CommonConstant.Gender.find((x) => (data ? data === x.value : x.value === 2))?.label!
                    );
                } catch (error) {
                    return '';
                }

            case FormatTextType.ShortNumber:
                try {
                    if (data < 1000) {
                        return data.toString();
                    } else if (data >= 1000) {
                        return sprintf('%sK', replace(floor(data! / 1000, 1).toString(), '.', ','));
                    } else if (data >= 1000000) {
                        return sprintf('%sM', replace(floor(data! / 1000000, 1).toString(), '.', ','));
                    } else if (data >= 1000000000) {
                        return sprintf('%sB', replace(floor(data! / 1000000000, 1).toString(), '.', ','));
                    }

                    return '0';
                } catch (error) {
                    return '';
                }

            default:
                return data;
        }
    }

    private parseDateByType(data: Date | number) {
        if (data instanceof Date) {
            data = data as Date;
        } else if (typeof data === 'number' && data !== 0) {
            data = fromUnixTime(data);
        } else if (data === 0) {
            data = undefined!;
        }

        return data;
    }
}

@NgModule({
    declarations: [FormatTextPipe],
    exports: [FormatTextPipe]
})
export class FormatTextPipeModule {}
