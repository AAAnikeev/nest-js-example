import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
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

  async validate(payload: any): Promise<{ name: string; email: string }> {
    if (!payload['email'] || !payload['name']) {
      throw new UnauthorizedException();
    }
    return { name: payload['name'], email: payload['email'] };
  }
}
