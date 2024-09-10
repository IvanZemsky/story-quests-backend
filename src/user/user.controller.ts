import { Body, Controller, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CreateUserDto } from "./dto/createUser.dto";
import { User } from "./user.schema";

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  async getUserByLogin(@Query() login: string) {
   const user = await this.userService.getUserByLogin(login)
   return user
  }

  @ApiOperation({summary: 'Создание пользователя'})
   @ApiResponse({status: 200, type: User})
   @Post()
   create(@Body() userDto: CreateUserDto) {
      return this.userService.createUser(userDto)
   }
}
