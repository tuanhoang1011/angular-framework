import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { sprintf } from 'sprintf-js';

@Pipe({
    name: 'sprintf'
})
export class SprintfPipe implements PipeTransform {
    value?: string;

    constructor() {}

    transform(content: string, params?: any[]) {
        this.value = sprintf(content, ...(params ?? []));

        return this.value;
    }
}

@NgModule({
    declarations: [SprintfPipe],
    exports: [SprintfPipe]
})
export class SprintfPipeModule {}
