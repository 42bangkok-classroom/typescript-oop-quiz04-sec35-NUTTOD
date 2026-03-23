import { Controller, Get } from '@nestjs/common';
import { AppService, UserService} from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/test')
  UserController(): string[] {
    return this.userService.test();
  }
}