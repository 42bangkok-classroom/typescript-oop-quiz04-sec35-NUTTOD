import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from './user.interface';
import * as fs from 'fs';
import * as path from 'path';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UserService {
  test(): string[] {
    return [];
  }

  findAll(): IUser[] {
    const filepath = path.join(process.cwd(), 'data', 'users.json');
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data) as IUser[];
  }

  findOne(id: string, fields?: string[]): Partial<IUser> {
    const users = this.findAll();
    const user = users.find((u) => u.id === id);

    if (!user) {
        throw new NotFoundException('user not found');
    }

    if (fields) {
        const filteredUser: Partial<IUser> = {};

        fields.forEach((field) => {
            if (user[field as keyof IUser] !== undefined) {
                filteredUser[field as keyof IUser] = user[field as keyof IUser];
            }
        });
        return filteredUser;
    }

    return user;
  }

  create(dto: CreateUserDto): IUser {
    const filepath = path.join(process.cwd(), 'data', 'users.json')
    const users: IUser[] = this.findAll();
    const latestuser = users.reduce((max, current) => {
        const currentId = parseInt(current.id, 10);
        return currentId > max ? currentId : max;
    }, 0)

    const newId = (latestuser + 1).toString();

    const newUsers: IUser = {
        id: newId,
        ...dto
    }

    users.push(newUsers);

    fs.writeFileSync(filepath, JSON.stringify(users, null, 2), 'utf-8');

    return newUsers;
  }
}
