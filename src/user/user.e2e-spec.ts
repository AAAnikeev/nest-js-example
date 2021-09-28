import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user.module';
import * as supertest from 'supertest';

describe('UserService (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: 'users-test',
          entities: ['./**/*.entity.ts'],
          synchronize: false,
          dropSchema: false,
          autoLoadEntities: true,
        }),
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    // userService = moduleFixture.get('UserService');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /user', () => {
    it('should return a user', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .post('/user')
        .set('Accept', 'application/json')
        .send({ name: 'test-name', email: 'test@test.com' })
        .expect('Content-Type', /json/)
        .expect(201);
      expect(body).toEqual({
        id: expect.any(Number),
        name: 'test-name',
        email: 'test@test.com',
        updatedAt: expect.any(String),
      });
    });
  });

  describe('GET /user/byname', () => {
    it('should return an array of users', async () => {
      const { body } = await supertest
        .agent(app.getHttpServer())
        .get('/user/byname')
        .send({ name: 'test-name' })
        .expect(200);
      expect(body).toEqual({
        id: expect.any(Number),
        name: 'test-name',
        email: 'test@test.com',
        updatedAt: expect.any(String),
      });
    });
  });
});
