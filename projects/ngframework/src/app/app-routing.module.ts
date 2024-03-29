import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';

import { AppRoutes } from './core/constants/router.const';
import { ErrorPageGuard } from './core/guards/error-page.guard';
import { PrivatePageGuard } from './core/guards/private-page.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: AppRoutes.Public,
                loadChildren: () => import('./core/components/public/public.module').then((m) => m.PublicModule)
            },
            {
                path: AppRoutes.Private,
                canActivate: [(route: ActivatedRouteSnapshot) => inject(PrivatePageGuard).canActivate(route)],
                loadChildren: () => import('./core/components/private/private.module').then((m) => m.PrivateModule)
            },
            {
                path: `${AppRoutes.Error}/:code`,
                canActivate: [() => inject(ErrorPageGuard).canActivate()],
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
