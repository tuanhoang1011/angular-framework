import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';

import { ErrorPageGuard } from './core/guards/error-page.guard';
import { PrivatePageGuard } from './core/guards/private-page.guard';
import { AppRoutes } from './core/routers/app.routes';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: AppRoutes.Public,
                loadChildren: () => import('./core/components/layout/public/public.module').then((m) => m.PublicModule)
            },
            {
                path: AppRoutes.Private,
                canActivate: [(route: ActivatedRouteSnapshot) => inject(PrivatePageGuard).canActivate(route)],
                loadChildren: () =>
                    import('./core/components/layout/private/private.module').then((m) => m.PrivateModule)
            },
            {
                path: AppRoutes.Error,
                canActivate: [() => inject(ErrorPageGuard).canActivate()],
                loadChildren: () =>
                    import('./core/components/layout/error-page/error-page.module').then((m) => m.ErrorPageModule)
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
