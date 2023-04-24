import { Injectable } from '@angular/core';
import { RefreshTokenRequest, RefreshTokenResponse } from '../../core/models/auth.model';
import { HttpBaseService } from '../../core/services/communicate-server/http-base.service';

@Injectable({
    providedIn: 'root'
})
export class AuthAPIService extends HttpBaseService {
    constructor() {
        super();
    }

    refreshToken(refreshToken: string) {
        return super.post<RefreshTokenRequest, RefreshTokenResponse>('API Route', 'API Name', {
            refreshToken
        });
    }
}
