import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AppRoutes } from '../constants/router.const';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class SignInGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    canActivate() {
        // user has already signed in -> prevent accessing signin page
        if (this.authService.isSignedInSession) {
            this.router.navigateByUrl(AppRoutes.Private);
            return false;
        }

        return true;
    }
}
