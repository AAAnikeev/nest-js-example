import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService
   ) {}

  @Get()
  getHelp(): string {
    return this.appService.getHelp();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/user/profile')
  getEmailAndNameFromJwt(@Request() req){
    return req.user;
  }

}
