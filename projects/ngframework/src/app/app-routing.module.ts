import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './core/routers/app.routes';
import { GlobalVariables } from './core/utils/global-variables.ultility';

const routes: Routes = [
    {
        path: GlobalVariables.language,
        resolve: {},
        children: [
            {
                path: AppRoutes.Public,
                loadChildren: () => import('./core/components/layout/public/public.module').then((m) => m.PublicModule)
            },
            {
                path: AppRoutes.Private,
                loadChildren: () =>
                    import('./core/components/layout/private/private.module').then((m) => m.PrivateModule)
            },
            { path: '**', redirectTo: AppRoutes.Public }
        ]
    },
    { path: '**', redirectTo: GlobalVariables.language }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
