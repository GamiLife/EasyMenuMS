import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseCreateTokenTest } from 'src/core/firebase';
import { DatabaseModule } from 'src/config/database/database.module';
import { JwtService } from '@nestjs/jwt';
import { IsPublic } from 'src/core/decorators';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/core/guards';
import { Reflector } from '@nestjs/core';
import { IJwtTokens } from 'src/core/interfaces';
import { AuthCreateDto } from './auth.dto';
import { AuthEntity } from './auth.entity';
import { Repository } from 'sequelize-typescript';

import { AUTH_REPOSITORY } from 'src/core/constants';
import { DestroyOptions, FindOptions, Op, json } from 'sequelize';
import { EmptyError } from 'src/core/exceptions';
import * as argon2 from 'argon2';

let firebaseToken: FirebaseCreateTokenTest;
let idUserCreated: number;
let tokenId: string;
let tokenIdUpdated: string;
let refreshTokenID: string;

let firstUidUser: string;

let simulateTokenExpiry: boolean = false;

@Controller("/users")
class AppController {

  @Get()
  getUsers() {
    return "Success Authentication using Jwt Token";
  }

  @Get("/authorized")
  @IsPublic()
  getUserSuccess() {
    return "Success"
  }
}

let dbInstance: AuthCreateDto[] = [];


describe('Auth Module', () => {
    let app: INestApplication;
    let authService: AuthService;
    let authRepository: Repository<AuthEntity>;
    let guard: AuthGuard;

    beforeAll(() => {
        firebaseToken = new FirebaseCreateTokenTest();
        firstUidUser = firebaseToken.uid
    })

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                ConfigModule.forRoot({ isGlobal: true }),
                AuthModule,
            ],
            controllers: [AppController]
        })
        .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(Reflector)));

        authService = moduleFixture.get<AuthService>(AuthService);

        jest.spyOn(authService, "updateToken").mockImplementation(
            async (key, refreshKey) => {

                const getInstance = dbInstance.find(el => el.key === key);

                if (!getInstance) {
                    throw new EmptyError("Unable to found token", HttpStatus.UNAUTHORIZED)
                }

                const isMatch = argon2.verify(
                    getInstance.refreshKey ?? "",
                    refreshKey
                )
        
                if (!isMatch) {
                    throw new EmptyError("Token-Id malformed", HttpStatus.FORBIDDEN)
                }



                const tokens: IJwtTokens = {
                    token: "FirstTokenUpdated",
                    refreshToken: "First updated refersh token",
                    hashToken: "Some hash",
                    expiry: new Date()
                }

                dbInstance = [
                    ...dbInstance.filter(el => el.key !== key),
                    {
                        key: tokens.token,
                        refreshKey: tokens.refreshToken,
                        expiry: new Date(),
                        userId: idUserCreated
                        
                    }
                ]

                return tokens
            }
        );

        authRepository = moduleFixture.get<Repository<AuthEntity>>(AUTH_REPOSITORY);
        
        authRepository.findOne = jest.fn().mockImplementation(async (options?: FindOptions<any>): Promise<any> => {
            // @ts-ignore
            const key = options?.where?.key ?? '';
            const foundEntity = dbInstance.find((el) => el.key === key);
            return foundEntity ?? null;
          });
        
        authRepository.create = jest.fn().mockImplementation(async (_token: AuthCreateDto): Promise<any> => {
            dbInstance.push(_token)
            return _token;
          });
        
        authRepository.destroy = jest.fn().mockImplementation(async (options?: DestroyOptions<any>): Promise<number> => {
            // @ts-ignore
            const key = options?.where?.key ?? '';
            // @ts-ignore
            const expiry = options?.where?.expiry;
            // @ts-ignore
            const include = options?.include;

            if (expiry && expiry[Op.lt] && simulateTokenExpiry) {
                
                const timeInMilliseconds = 49 * 60 * 60 * 1000; // 49 hours in milliseconds
                const addDate = new Date(Date.now() + timeInMilliseconds);
                
                const initialLength = dbInstance.length;
                dbInstance = dbInstance.filter((el) => el.expiry >= addDate);
                const deletedCount = initialLength - dbInstance.length;
                return deletedCount;
              }


            if (include && Array.isArray(include)) {
                dbInstance = []
                return 1
            }

            const initialLength = dbInstance.length;
            dbInstance = dbInstance.filter((el) => el.key !== key);
            const deletedCount = initialLength - dbInstance.length;
            return deletedCount;
        });

    
        guard = moduleFixture.get<AuthGuard>(AuthGuard);
        await app.init();
    });

    afterAll(async () => {
        await app.close();
        await firebaseToken.removeCustomToken();
    });
    
    it('/auth (POST) request without credentials', () => {
        return request(app.getHttpServer())
            .post('/auth')
            .expect(401)
            .expect({
                statusCode: 401, 
                message: 'Incorrect authentication credentials'
            });
    });

    it('/auth (POST) request with incorrect header authentication', () => {
        return request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "SomeHeader")
            .expect(401)
            .expect({
                statusCode: 401, 
                message: 'Invalid authentication header'
            });
    });

    it('/auth (POST) request without firebaseToken authentication', () => {
        return request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer")
            .expect(401)
            .expect({
                statusCode: 401, 
                message: 'Token missing in the authentication'
            });
    });
    
    it('/auth (POST) request with a user with email_verified as false', async () => {

        firebaseToken.email_verified = false
        const testToken = await firebaseToken.getIdToken()

        return request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + testToken.idToken)
            .expect(403)
            .expect({
                statusCode: 403, 
                message: 'Email not verified'
            });
    });

    it('/auth (POST) request with firebaseToken malformed', async () => {

        firebaseToken.email_verified = true
        const testToken = await firebaseToken.getIdToken()

        return await request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + "onfwofw")
            .expect(403)
            .expect({
                statusCode: 403,
                message: "Decoding Firebase ID token failed"
            });
    });
    
    it('/auth (POST) request successfully, user created', async () => {

        firebaseToken.email_verified = true
        const testToken = await firebaseToken.getIdToken()

        await request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + testToken.idToken)
            .expect(201)
            .then(async ({body}) => {
                const { id } = await body.data
                idUserCreated = id
            });

        expect(dbInstance.length).toEqual(1);

    });
   
    it('/auth (POST) request successfully, user found', async () => {

        const testToken = await firebaseToken.getIdToken()

        await request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + testToken.idToken)
            .expect(201)
            .expect(({ body }) => body.data.id === idUserCreated)
            .then(({body}) => {
                const {token, refreshToken} = body;
                tokenId = token;
                refreshTokenID = refreshToken;
            });

        expect(dbInstance.length).toEqual(2);

    });
 
    it('/auth (POST) request failed, email already registered', async () => {

        firebaseToken.uid = "SomeOtherUid"
        const testToken = await firebaseToken.getIdToken()

        return await request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + testToken.idToken)
            .expect(409)
            .expect({
                statusCode: 409,
                message: "Email already registered"
            });
    });

    it('/auth (PUT) update user token session ', async () => {

        await request(app.getHttpServer())
            .put('/auth')
            .set("Authorization", "Bearer " + tokenId)
            .set("Token-Id", refreshTokenID)
            .expect(200)
            .then(({body}) => {
                const { token } = body;
                tokenIdUpdated = token;
            });;

        expect(dbInstance.length).toEqual(2);
        expect(
            dbInstance.some(el => el.key === tokenIdUpdated)
        ).toEqual(true);
    });

    it('/auth (DELETE) expect Unable to found token', async () => {

        await request(app.getHttpServer())
            .delete('/auth')
            .set("Authorization", "Bearer " + tokenId)
            .expect(401)
            .expect({
                statusCode: 401,
                message: "Unable to found token"
            });
        
    });

    it('/auth (DELETE) remove user token session - logout', async () => {

        await request(app.getHttpServer())
            .delete('/auth')
            .set("Authorization", "Bearer " + tokenIdUpdated)
            .expect(204)
        
        expect(dbInstance.length).toEqual(1)
        expect(
            dbInstance.some(el => el.key === tokenIdUpdated)
        ).toEqual(false);
    });

    it('/auth (DELETE) remove all user token session', async () => {

        jest.spyOn(authService, "destroyAllKeys").mockImplementation(
            async () => { dbInstance = [] }
        );

        jest.spyOn(guard, "canActivate").mockImplementation(async () => true);

        await request(app.getHttpServer())
            .delete('/auth/all')
            .set("Authorization", "Bearer someToken")
            .expect(204);

        expect(dbInstance.length).toEqual(0)
    });

    it('/auth (POST) should remove all expiry tokens', async () => {
        
        firebaseToken.uid = firstUidUser
        const testToken = await firebaseToken.getIdToken()
        
        for (let i = 0; i < 3; i++) {
            await request(app.getHttpServer())
                .post('/auth')
                .set("Authorization", "Bearer " + testToken.idToken)
                .expect(201);
                
        }

        expect(dbInstance.length).toEqual(3);
        
        simulateTokenExpiry = true
        await request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + testToken.idToken)
            .expect(201);

        expect(dbInstance.length).toEqual(1);

    });

    it("/users (GET) expect unauthorized", () => {
        return request(app.getHttpServer())
            .get('/users')
            .set("Authorization", "Bearer " + "someJwtTokenId0")
            .expect(401)
            .expect({
                statusCode :401,
                message: "jwt malformed"
            });
    });

    it("/users (GET) expect authorized", () => {
        return request(app.getHttpServer())
            .get('/users')
            .set("Authorization", "Bearer " + tokenId)
            .expect(200)
            .expect('Success Authentication using Jwt Token');
    });
});
