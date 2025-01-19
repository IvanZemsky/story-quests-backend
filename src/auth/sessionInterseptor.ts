import {
   CallHandler,
   ExecutionContext,
   Injectable,
   NestInterceptor,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { Request } from "express"
import { CookieService } from "./cookie.service"
import { Observable } from "rxjs"

@Injectable()
export class SessionInterceptor implements NestInterceptor {
   constructor(private jwtService: JwtService) {}

   async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
   ): Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest() as Request
      const token = req.cookies && req.cookies[CookieService.tokenKey]

      if (token) {
         try {
            const sessionInfo = await this.jwtService.verifyAsync(token, {
               secret: process.env.JWT_SECRET || "secret_key",
            })
            req["session"] = sessionInfo
         } catch (error) {
            console.error("JWT verification error: ", error)
         }
      }

      return next.handle()
   }
}
