import { Injectable, NotFoundException } from '@nestjs/common';
import { InterUser } from './user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  test(): string[] {
    return [];
  }

  findAll(): InterUser[] {
    const filepath = path.join(process.cwd(), 'data', 'users.json');

    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data) as InterUser[];
  }

  findOne(id: string, fields?: string[]): Partial<InterUser> {
    const users = this.findAll();
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (fields) {
      const filteredUser: Partial<InterUser> = {};

      fields.forEach((field) => {
        if (user[field as keyof InterUser] !== undefined) {
          filteredUser[field as keyof InterUser] =
            user[field as keyof InterUser];
        }
      });
      return filteredUser;
    }
    return user;
  }

  create(dto: CreateUserDto): InterUser {
    const filepath = path.join(process.cwd(), 'data', 'users.json');
    const users: InterUser[] = this.findAll();

    const latestId = users.reduce((max, current) => {
      const currentId = parseInt(current.id, 10);
      return currentId > max ? currentId : max;
    }, 0);

    const newId = (latestId + 1).toString();

    const newUser: InterUser = {
      id: newId,
      ...dto,
    };

    users.push(newUser);

    fs.writeFileSync(filepath, JSON.stringify(users, null, 2), 'utf-8');

    return newUser;
  }
}
