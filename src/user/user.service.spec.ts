import { Test, TestingModule} from '@nestjs/testing'
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service'
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserController } from './user.controller';


describe("UserService", () => {
    const token = getRepositoryToken(User);
    let service: UserService;
    let repo: Repository<User>;
    let controller: UserController;
    
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports:[
            TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'postgres',
                database: 'users',
                entities: ['./**/*.entity.ts'],
                synchronize: true,
                dropSchema: false,
                autoLoadEntities: true,
                keepConnectionAlive: true
              }),
              TypeOrmModule.forFeature([User])
        ],
        providers: [
          UserService
        ],
      }).compile();
      service = module.get<UserService>(UserService);
      console.log(service);
      repo = module.get(token);
    });

    describe('should be defined controller', () => {
        expect(controller).toBeDefined();
    });
    
    describe('should be defined', () => {
        expect(service).toBeDefined();
    });



    describe('get by name', () => {
        let result: Promise<User>;
        const newUser = service.findOneByName('Алекс Аникей');
        expect(newUser).toBeDefined();
    });
});