import { Injectable } from "@nestjs/common"
import { Response } from "express"

@Injectable()
export class CookieService {
   static tokenKey = "access-token"
   private backendDomain = process.env.BACKEND_DOMAIN

   setToken(res: Response, token: string) {
      res.cookie(CookieService.tokenKey, token, {
         httpOnly: true,
         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
         sameSite: "none",
         secure: true,
         domain: this.backendDomain,
      })
   }

   removeToken(res: Response) {
      res.clearCookie(CookieService.tokenKey)
   }
}
