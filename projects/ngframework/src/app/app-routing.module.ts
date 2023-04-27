import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './core/routers/app.routes';

const routes: Routes = [
    {
        path: '',
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
            {
                path: AppRoutes.Error,
                loadChildren: () =>
                    import('./core/components/error-page/error-page.module').then((m) => m.ErrorPageModule)
            },
            { path: '**', redirectTo: AppRoutes.Public }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
