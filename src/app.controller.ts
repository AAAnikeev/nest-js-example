import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserDec } from './decorators/user-dec';
import { User } from './user/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHelp(): string {
    return this.appService.getHelp();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/profile')
  getEmailAndNameFromJwt(@UserDec() req: User): User {
    return req;
  }
}
