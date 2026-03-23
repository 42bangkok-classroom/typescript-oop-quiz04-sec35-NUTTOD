import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  getUsertest(): string[] {
    return this.userService.test();
  }

  @Get()
  getUser(): string[] {
    return this.userService.test();
  }
}
