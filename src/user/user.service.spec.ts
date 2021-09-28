import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';
import { env } from "process";

describe('UserService', () => {
  let service: UserService;
  let dbName = env.NODE_ENV === 'test'? 'users-test': 'users'
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'postgres',
          database: dbName,
          entities: [User],
          synchronize: false,
          dropSchema: false,
          autoLoadEntities: true,
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UserService],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('test get user', async () => {
    const newUser = await service.findOneByName('Алекс Аникей');
    expect(newUser).toEqual({
      id: expect.any(Number),
      name: 'Алекс Аникей',
      email: 'jazz323323@gmail.com',
      updatedAt: expect.any(Date),
    });
  });

  it('test unregistered user', async () => {
    const newUser = await service.findOneByName('some unregistered');
    expect(newUser).toBeUndefined();
  });
});
