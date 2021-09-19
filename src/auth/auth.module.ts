import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
      PassportModule,
      JwtModule.register({
        signOptions: { expiresIn: '24h' },
      }),
    ],
    providers: [AuthService, JwtStrategy],
  })
export class AuthModule {}
