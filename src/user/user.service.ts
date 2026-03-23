import { Injectable, NotFoundException } from '@nestjs/common';
import { InterUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import { NotFoundError } from 'rxjs';

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

  findOne(id: string, fields?: string): Partial<InterUser> {
    const users = this.findAll();
    const user = users.find((u) => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (fields) {
      const fieldsArray = fields.split(',');
      const filteredUser: Partial<InterUser> = {};

      fieldsArray.forEach((field) => {
        if (user[field as keyof InterUser] !== undefined) {
          filteredUser[field as keyof InterUser] =
            user[field as keyof InterUser];
        }
      });
      return filteredUser;
    }
    return user;
  }
}
