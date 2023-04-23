import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    idToken = '';
    refreshToken = '';
    signedIn = false;

    constructor() {}
}
