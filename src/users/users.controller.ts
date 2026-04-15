import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './user.dto';
interface User {
  id?: string;
  name: string;
  email: string;
}
@Controller('users')
export class UsersController {
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

  @Get()
  getUsers() {
    return this.users;
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    const user: User | undefined = this.users.find((u: User) => u.id === id);

    if (!user) {
      return {
        error: 'User not found',
      };
    }
    return user;
  }

  @Post()
  createUser(@Body() body: CreateUserDto): User {
    this.users.push({
      ...body,
      id: `${this.users.length + 1}`,
    });
    return this.users[this.users.length - 1];
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return {
      message: 'User deleted',
    };
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: User) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException('User not found');
    }

    const currentUser = this.users[position];
    const updatedUser = {
      ...currentUser,
      ...changes,
    };

    this.users[position] = updatedUser;
    return updatedUser;
  }
}
