import { Injectable } from '@nestjs/common';
import { InterUser } from './user.interface';
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
    return JSON.parse(data);
  }
}
