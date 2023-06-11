import { Test, TestingModule } from '@nestjs/testing';
import { Controller, Get, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './';
import { UsersService } from 'src/modules/users/users.service';
import { Reflector } from '@nestjs/core';
import { IsPublic } from '../decorators';

@Controller("/users")
class AppController {

  @Get()
  getUsers() {
    return "Unauthorized";
  }

  @Get("/authorized")
  @IsPublic()
  getUserSuccess() {
    return "Success"
  }
}

describe('AppController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [ 
                AuthGuard, 
                JwtService
            ],
        })
        .compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(Reflector)))        
        await app.init();
    });

    it('/users (GET) expect unauthorized', () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(401)
            .expect({
                statusCode: 401,
                message: "Incorrect authentication credentials"
            });
    });

    it("/users (GET) expect jwt malformed", () => {
        return request(app.getHttpServer())
            .get("/users")
            .set("Authorization", "Bearer ddiehde")
            .expect(401)
            .expect({
                statusCode :401,
                message: "jwt malformed"
            });
    })

    it("/users/authorized (GET) expect authorized", () => {
        return request(app.getHttpServer())
            .get('/users/authorized')
            .expect(200)
            .expect('Success');
    })
                
})