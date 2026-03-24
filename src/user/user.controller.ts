import { Body, Controller, Get, Param, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import type { IUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  getUsertest(): string[] {
    return this.userService.test();
  }

  @Get()
  getUserAll(): IUser[] {
    return this.userService.findAll();
  }

  @Get(':id')
  getOneUser(
    @Param('id') id: string, 
    @Query('fields') fields?: string,
  ): Partial<IUser> {
    const arrayfield = fields ? fields.split(',') : undefined
    return this.userService.findOne(id, arrayfield);
  }

  @Post()
  createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto): IUser {
    return this.userService.create(createUserDto);
  }
}
