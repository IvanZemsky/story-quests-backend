import { Injectable } from "@nestjs/common"
import { Response } from "express"

@Injectable()
export class CookieService {
   static tokenKey = "access-token"

   setToken(res: Response, token: string) {
      res.cookie(CookieService.tokenKey, token, {
         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
         httpOnly: true,
         sameSite: "none",
         secure: true,
      })
   }

   removeToken(res: Response) {
      res.clearCookie(CookieService.tokenKey)
   }
}
