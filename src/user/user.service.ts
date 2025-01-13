import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "./user.schema"
import { Model } from "mongoose"
import { CreateUserDto } from "./dto/createUser.dto"

@Injectable()
export class UserService {
   constructor(@InjectModel(User.name) private userModel: Model<User>) {}

   async findByLogin(login: string) {
      const user = await this.userModel.findOne({ login })
      return user
   }

   async createUser(login: string, hash: string, salt: string) {
      const user = await this.userModel.create({login, hash, salt})
      return user
   }
}
