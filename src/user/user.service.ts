import { Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUserByLogin(login: string): Promise<User> {
   const user = await this.userModel.findOne({login})
   return user
  }

  async createUser(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    return user;
 }

 async getUsers() {
  const users = await this.userModel.find()
  return users
 }
}
