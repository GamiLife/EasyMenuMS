import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from './auth.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseCreateTokenTest } from 'src/core/firebase';
import { DatabaseModule } from 'src/config/database/database.module';

let token: FirebaseCreateTokenTest;
let idUserCreated: number;

describe('Auth Module', () => {
    let app: INestApplication;

    beforeAll(() => {
        token = new FirebaseCreateTokenTest();
    })

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                DatabaseModule,
                ConfigModule.forRoot({ isGlobal: true }),
                AuthModule,
            ],
        })
        .compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
        await token.removeCustomToken();
    });

    it('/ (POST) request without credentials', () => {
        return request(app.getHttpServer())
            .post('/auth')
            .expect(401)
            .expect({
                statusCode: 401, 
                message: 'Incorrect authentication credentials'
            });
    });

    it('/ (POST) request with incorrect header authentication', () => {
        return request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "SomeHeader")
            .expect(401)
            .expect({
                statusCode: 401, 
                message: 'Invalid authentication header'
            });
    });

    it('/ (POST) request without token authentication', () => {
        return request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer")
            .expect(401)
            .expect({
                statusCode: 401, 
                message: 'Token missing in the authentication'
            });
    });

    it('/ (POST) request with a user with email_verified as false', async () => {

        token.email_verified = false
        const testToken = await token.getIdToken()

        return request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + testToken.idToken)
            .expect(403)
            .expect({
                statusCode: 403, 
                message: 'Email not verified'
            });
    });

    it('/ (POST) request with token malformed', async () => {

        token.email_verified = true
        const testToken = await token.getIdToken()

        return await request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + "onfwofw")
            .expect(403)
            .expect({
                statusCode: 403,
                message: "Decoding Firebase ID token failed"
            });
    });

    it('/ (POST) request successfully, user created', async () => {

        token.email_verified = true
        const testToken = await token.getIdToken()

        return await request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + testToken.idToken)
            .expect(201)
            .then(async (response) => {
                const { id } = await response.body.data
                idUserCreated = id
            });
    });

    it('/ (POST) request successfully, user found', async () => {

        token.email_verified = true
        const testToken = await token.getIdToken()

        return await request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + testToken.idToken)
            .expect(201)
            .expect(({ body }) => body.data.id === idUserCreated);
    });

    it('/ (POST) request failed, email already registered', async () => {

        token.uid = "SomeOtherUid"
        const testToken = await token.getIdToken()

        return await request(app.getHttpServer())
            .post('/auth')
            .set("Authorization", "Bearer " + testToken.idToken)
            .expect(409)
            .expect({
                statusCode: 409,
                message: "Email already registered"
            });
    });
});
