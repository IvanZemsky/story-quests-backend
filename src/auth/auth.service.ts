import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common"
import { UserService } from "src/user/user.service"
import { PasswordService } from "./password.service"
import { JwtService } from "@nestjs/jwt"

@Injectable()
export class AuthService {
   constructor(
      private userService: UserService,
      private passwordService: PasswordService,
      private jwtService: JwtService,
   ) {}

   async signUp(login: string, password: string) {
      const user = await this.userService.findByLogin(login)

      if (user) {
         throw new BadRequestException({ type: "login-exists" })
      }

      const salt = this.passwordService.getSalt()
      const hash = this.passwordService.getHash(password, salt)

      const newUser = await this.userService.createUser(login, hash, salt)

      const accessToken = await this.jwtService.signAsync({
         id: newUser._id,
         login: newUser.login,
      }, {secret: String(process.env.JWT_SECRET)})

      return { accessToken }
   }

   async signIn(login: string, password: string) {
      const user = await this.userService.findByLogin(login)

      if (!user) {
         throw new UnauthorizedException()
      }

      const hash = this.passwordService.getHash(password, user.salt)

      if (hash !== user.hash) {
         throw new UnauthorizedException()
      }

      const accessToken = await this.jwtService.signAsync({
         id: user._id,
         login: user.login,
      }, {secret: String(process.env.JWT_SECRET)})

      return { accessToken }
   }
}
