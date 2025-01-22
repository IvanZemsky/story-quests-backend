import {  Controller, Get, Param, Query, } from "@nestjs/common"
import { UserService } from "./user.service"
import { } from "@nestjs/swagger"

@Controller("users")
export class UserController {
   constructor(private userService: UserService) {}

   @Get(":id")
   async getUserById(@Param("id") id: string) {
      const user = await this.userService.findById(id)
      
      if (user) {
         return {
            id: user._id,
            login: user.login,
         }
      }

      return null
   }

   async getUserByLogin(@Query() login: string) {
      const user = await this.userService.findByLogin(login)
      return user
   }

   // @ApiOperation({ summary: "Создание пользователя" })
   // @ApiResponse({ status: 200, type: User })
   // @Post()
   // async create(@Body() userDto: CreateUserDto) {
   //    return await this.userService.createUser(userDto)
   // }
}
