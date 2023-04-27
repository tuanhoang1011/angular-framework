import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublicRoutes } from '../../../routers/public.routes';
import { PublicComponent } from './public.component';

const routes: Routes = [
    {
        path: '',
        component: PublicComponent,
        children: [
            // remove later
            {
                path: PublicRoutes.Example,
                loadChildren: () => import('../../../../features/example/example.module').then((m) => m.ExampleModule)
            },
            { path: '**', redirectTo: PublicRoutes.Example }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PublicRoutingModule {}
