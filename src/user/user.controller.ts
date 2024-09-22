import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.schema';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  async getUserByLogin(@Query() login: string) {
    const user = await this.userService.getUserByLogin(login);
    return user;
  }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  async create(@Body() userDto: CreateUserDto) {
    return await this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение пользователей' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsers() {
    const users = await this.userService.getUsers();
    return users;
  }
}
