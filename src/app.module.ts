import { Module, Options } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [AuthModule, UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
     TypeOrmModule.forRoot({
    type: 'postgres',
    host: env.POSTGRES_HOST,
    port: Number(env.POSTGRES_PORT),
    username: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    entities: [User],
    synchronize: true,
    autoLoadEntities: true
})],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
