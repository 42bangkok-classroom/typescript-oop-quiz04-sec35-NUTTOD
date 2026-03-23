import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users/test')
  getUser(): string[] {
    return this.userService.test();
  }
}
