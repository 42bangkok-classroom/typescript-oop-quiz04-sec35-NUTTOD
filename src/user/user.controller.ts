import { Controller, Get, Param, Query } from '@nestjs/common';
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

  @Get(':id')
  getoneUser(
    @Param('id') id: string,
    @Query('fields') fields?: string,
  ): Partial<InterUser> {
    return this.userService.findOne(id, fields);
  }
}
