import { HttpStatus, UnauthorizedException } from "@nestjs/common";

export class AuthenticationError extends UnauthorizedException {
    constructor(message: string, statusCode: number) {
        super(
            {
                statusCode,
                message
            }
        )
    }
}