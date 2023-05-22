import { HttpStatus } from "@nestjs/common";
import { AUTH_AUTHORIZATION_HEADER } from "../constants";
import { EmptyError } from "../exceptions";

export const parseAuthenticationHeader = (idToken: string): string => {
    
    if (!idToken) {
        throw new EmptyError("Incorrect authentication credentials", HttpStatus.UNAUTHORIZED)
    }

    const [headerKeywoard, token] = idToken.split(" ");

    if (headerKeywoard !== AUTH_AUTHORIZATION_HEADER) {
        throw new EmptyError("Invalid authentication header", HttpStatus.UNAUTHORIZED)
    }

    if (!token) {
        throw new EmptyError("Token missing in the authentication", HttpStatus.UNAUTHORIZED)
    }

    return token
}