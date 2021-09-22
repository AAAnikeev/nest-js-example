import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { UserService } from '../../user/user.service';
import { User } from '../../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
      }),
      algorithms: ['RS256'],
      issuer: 'https://accounts.google.com',
    });
  }

  async validate(payload: any): Promise<User> {
    const name = payload.name;
    if (!payload.email || !payload.name) {
      throw new UnauthorizedException("Cann't get name and email from this JWT");
    }
    const user = await this.userService.findOneByName(name);
    if (!user){
      throw new UnauthorizedException("Cann't find anyone with this name");
    }
    console.log(user.email);
    console.log(payload.email);
    if (user.email != payload.email){
      throw new UnauthorizedException("Email for " + user.name + " is different");
    }
    return user;
  }
}
