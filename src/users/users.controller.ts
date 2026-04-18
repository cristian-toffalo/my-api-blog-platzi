import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
  ParseIntPipe,
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
  findUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() changes: User) {
    return this.usersService.update(id, changes);
  }
}
