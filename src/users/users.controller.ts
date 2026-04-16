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

import type { User } from './user.model';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() body: CreateUserDto): User {
    return this.usersService.create(body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: User) {
    return this.usersService.update(id, changes);
  }
}
