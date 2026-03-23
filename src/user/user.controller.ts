import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import type { InterUser } from './user.interface';
import { CreateUserDto } from './create-user.dto';

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
    const arrayfield = fields ? fields.split(',') : undefined;
    return this.userService.findOne(id, arrayfield);
  }

  @Post()
  createUser(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ): InterUser {
    return this.userService.create(createUserDto);
  }
}
