import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHelp(): string {
    return "Use this app like that: curl https://localhost:3000/user/profile -H \"Authorization: Bearer ${JWT}\"";
  }
}
