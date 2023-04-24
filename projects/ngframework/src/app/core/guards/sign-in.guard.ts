import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AppRoutes } from '../routers/app.routes';
import { AuthBaseService } from '../services/auth/auth-base.service';

@Injectable({ providedIn: 'root' })
export class SignInGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthBaseService) {}

    canActivate() {
        // user has already signed in -> prevent accessing signin page
        if (this.authService.isSignedInSession) {
            this.router.navigateByUrl(AppRoutes.Private);
            return false;
        }

        return true;
    }
}
