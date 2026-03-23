import { Controller, Get } from '@nestjs/common';
import { AppService, UserService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/test')
  getUser(): string[] {
    return this.userService.test();
  }
}
