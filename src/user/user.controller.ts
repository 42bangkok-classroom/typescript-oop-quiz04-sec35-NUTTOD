import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { InterUser } from './user.interface';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  getUsertest(): string[] {
    return this.userService.test();
  }

  @Get()
  getUser(): InterUser[] {
    return this.userService.findAll();
  }
}
