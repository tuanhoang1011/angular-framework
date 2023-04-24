export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    session: string;
    challengeName: string;
    authenticationResult: AuthenticationResult;
}

export interface AuthenticationResult {
    accessToken: string;
    expiresIn: string;
    idToken: string;
    refreshToken: string;
    tokenType: string;
}
