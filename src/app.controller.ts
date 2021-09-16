import { Controller, Get, Redirect, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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
