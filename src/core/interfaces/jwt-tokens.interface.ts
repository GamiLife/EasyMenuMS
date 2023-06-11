export interface IJwtTokens {
    token: string;
    refreshToken: string;
    hashToken?: string
    expiry: Date
}

export interface IJwtVerify {
    sub: string;
    email?: string;
}