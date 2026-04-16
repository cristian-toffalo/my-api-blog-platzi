import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: '1',
      name: 'jhon doe',
      email: 'jhondoe@example.com',
    },
    {
      id: '2',
      name: 'janem doe',
      email: 'jane.doe@example.com',
    },
  ];

  findAll() {
    return this.users;
  }

  getUserById(id: string) {
    const position = this.findOne(id);

    return this.users[position];
  }

  create(user: CreateUserDto) {
    this.users.push({
      ...user,
      id: `${this.users.length + 1}`,
    });
    return this.users[this.users.length - 1];
  }

  update(id: string, user: User) {
    const position = this.findOne(id);
    const currentUser = this.users[position];
    const updatedUser = {
      ...currentUser,
      ...user,
    };

    this.users[position] = updatedUser;
    return updatedUser;
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return {
      message: 'User deleted',
    };
  }

  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException('User not found');
    }

    return position;
  }
}
