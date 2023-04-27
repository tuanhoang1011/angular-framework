import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInGuard } from '../../core/guards/sign-in.guard';
import { AuthRoutes } from '../../core/routers/auth.routes';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: AuthRoutes.SignIn,
                loadChildren: () => import('./components/sign-in/sign-in.module').then((m) => m.SignInModule),
                canActivate: [SignInGuard]
            },
            {
                path: '**',
                redirectTo: AuthRoutes.SignIn
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
