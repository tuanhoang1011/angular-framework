import { Injectable } from '@angular/core';
import { isEmpty, keys } from 'lodash';
import { environment } from 'projects/ngframework/src/environments/environment';
import { Subject, takeUntil } from 'rxjs';

import { Configuration } from '../../models/config.model';
import { isNullOrUndefined } from '../../utils/common-func.ultility';
import { GlobalVariables } from '../../utils/global-variables.ultility';
import { HttpBaseService } from '../communicate-server/http-base.service';

@Injectable({ providedIn: 'root' })
export class ConfigService extends HttpBaseService {
    constructor() {
        super();
    }

    loadConfig(destroy$: Subject<void>): Promise<Configuration> {
        return new Promise((resolve) => {
            super
                .getLocalFile<Configuration>(`../../../../assets/configurations/config.${environment.env}.json`)
                .pipe(takeUntil(destroy$))
                .subscribe({
                    next: (res) => {
                        try {
                            if (!res || isEmpty(res)) return;

                            keys(res).forEach((key) => {
                                if (!isNullOrUndefined(res[key])) GlobalVariables[key] = res[key];
                            });

                            resolve({});
                        } catch (error) {
                            throw error;
                        }
                    }
                });
        });
    }
}
