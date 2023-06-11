import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { usersProviders } from '../users/users.provider';
import { authProviders } from './auth.provider';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/core/guards';

@Module({
	imports: [
		UsersModule, 
		JwtModule.register({
			secret: process.env.JWTKEY,
			signOptions: {
				expiresIn: process.env.TOKEN_EXPIRATION
			}
		}),
	],
	providers: [
		AuthService, 
		AuthGuard,
		...usersProviders, 
		...authProviders],
	exports: [AuthService],
	controllers: [AuthController],
})
export class AuthModule {}
