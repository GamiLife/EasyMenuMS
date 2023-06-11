import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { AUTH_AUTHORIZATION_HEADER } from "../constants";


export class HeaderAuthenticator<T> {

    constructor(
        private errorType: new (message: string, statusCode: number) => T
    ) {}

    parseAuthenticationHeader(idToken: string): string {


        if (!idToken) {
            throw new this.errorType("Incorrect authentication credentials", HttpStatus.UNAUTHORIZED);
        }
    
        const [headerKeywoard, token] = idToken.split(" ");
    
        if (headerKeywoard !== AUTH_AUTHORIZATION_HEADER) {
            throw new this.errorType("Invalid authentication header", HttpStatus.UNAUTHORIZED);
        }
    
        if (!token) {
            throw new this.errorType("Token missing in the authentication", HttpStatus.UNAUTHORIZED);
        }
    
        return token
    }
}