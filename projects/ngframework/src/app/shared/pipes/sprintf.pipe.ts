import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { sprintf } from 'sprintf-js';

@Pipe({
    name: 'sprintf'
})
export class SprintfPipe implements PipeTransform {
    value?: string;

    constructor(private translateService: TranslateService) {}

    transform(template: string, params?: any[]) {
        this.translateService
            .get([template])
            .pipe(map((res) => (res[template] ? sprintf(res[template!], ...(params ?? [])) : '')))
            .subscribe((value) => (this.value = value));

        return this.value;
    }
}

@NgModule({
    declarations: [SprintfPipe],
    exports: [SprintfPipe]
})
export class SprintfPipeModule {}
