import { Injectable } from '@angular/core';
import { map } from 'rxjs';

import { APIName, APIRoutes } from '../../core/constants/api-routes';
import { RefreshTokenResponse, SignInRequest, SignInResponse, UserProfileResponse } from '../../core/models/auth.model';
import { HttpBaseService } from '../../core/services/communicate-server/http-base.service';

@Injectable({
    providedIn: 'root'
})
export class AuthAPIService extends HttpBaseService {
    constructor() {
        super();
    }

    signIn(model: SignInRequest) {
        const reqModel = {
            Username: model.username,
            Password: model.password
        };

        return super.post(APIRoutes.SignIn, APIName.SignInPOST, reqModel).pipe(
            map((res: any) => {
                const resModel: SignInResponse = {
                    expiresIn: res.ExpiresIn,
                    idToken: res.IdToken,
                    refreshToken: res.RefreshToken,
                    passwordExpireDate: res.PasswordExpireDate
                };

                return resModel;
            })
        );
    }

    signOut() {
        return super.put(APIRoutes.SignOut, APIName.SignOutPUT);
    }

    getUserProfile() {
        return super.get(APIRoutes.Profile, APIName.ProfileGET).pipe(
            map((res: any) => {
                const resModel: UserProfileResponse = {
                    userId: res.UserId,
                    permissions: res.Permissions,
                    isAgreeLicense: res.IsAgreeLicense,
                    profile: res.Profile
                };

                return resModel;
            })
        );
    }

    refreshToken(refreshToken: string) {
        return super
            .post(APIRoutes.RefreshToken, APIName.RefreshTokenPOST, {
                refreshToken
            })
            .pipe(
                map((res: any) => {
                    const resModel: RefreshTokenResponse = {
                        expiresIn: res.ExpiresIn,
                        idToken: res.IdToken,
                        refreshToken: res.RefreshToken
                    };

                    return resModel;
                })
            );
    }
}
