import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isEmpty } from 'lodash';
import { environment } from 'projects/ngframework/src/environments/environment';

import { Configuration } from '../../models/configuration.model';
import { GlobalVariables } from '../../utils/global-variables.ultility';
import { isNullOrUndefined } from '../../utils/utils-func.ultility';

@Injectable({ providedIn: 'root' })
export class ConfigService {
    constructor(private httpClient: HttpClient) {}

    loadConfig(): Promise<Configuration> {
        return new Promise((resolve) => {
            this.httpClient.get(`../../../../assets/configurations/config.${environment.env}.json`).subscribe({
                next: (res: Configuration) => {
                    try {
                        if (!res || isEmpty(res)) return;

                        Object.keys(res).forEach((key) => {
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
