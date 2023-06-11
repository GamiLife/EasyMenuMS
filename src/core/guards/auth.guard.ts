import {
    CanActivate,
    ExecutionContext,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC } from 'src/core/constants';
import { HeaderAuthenticator } from 'src/core/helpers';
import { AuthenticationError } from '../exceptions';
  

@Injectable()
export class AuthGuard extends HeaderAuthenticator<AuthenticationError> implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {super(AuthenticationError)}

    async canActivate(context: ExecutionContext): Promise<boolean> {
   
        const isPublic = this.reflector.get<boolean>(
            IS_PUBLIC,
            context.getHandler()
        );

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        try {
            await this.jwtService.verifyAsync(
                token
            );
        } catch (error) {
            throw new AuthenticationError(error.message, HttpStatus.UNAUTHORIZED)
        }

        return true;
    }
    
    private extractTokenFromHeader(request: Request): string {
        return this.parseAuthenticationHeader(request.headers["authorization"])
    }
    
}