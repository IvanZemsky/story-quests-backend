import { forwardRef, Module } from "@nestjs/common"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { UserModule } from "src/user/user.module"
import { CookieService } from "./cookie.service"
import { PasswordService } from "./password.service"
import { JwtModule } from "@nestjs/jwt"

@Module({
   imports: [
      forwardRef(() => UserModule),
      JwtModule.register({
         global: true,
         secret: String(process.env.JWT_SECRET),
         signOptions: {expiresIn: "1d"},
      }),
   ],
   controllers: [AuthController],
   providers: [AuthService, PasswordService, CookieService],
})
export class AuthModule {}
