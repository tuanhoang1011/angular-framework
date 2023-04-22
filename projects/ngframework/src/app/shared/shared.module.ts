import { NgModule } from '@angular/core';

import { ButtonModule } from './components/button/button.module';
import { AutoFocusDirectiveModule } from './directives/auto-focus.directive';
import { SprintfPipeModule } from './pipes/sprintf.pipe';

// ---------------- Defined modules ----------------
const modules = [ButtonModule];

// ---------------- Directives ----------------
const directives = [AutoFocusDirectiveModule];

// ------------------- Pipes ------------------
const pipes = [SprintfPipeModule];

@NgModule({
    imports: [...modules, ...directives, ...pipes],
    exports: [...modules, ...directives, ...pipes]
})
export class SharedModule {}
