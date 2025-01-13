import {
   Body,
   Controller,
   Get,
   HttpCode,
   HttpStatus,
   Post,
   Res,
   UseGuards,
} from "@nestjs/common"
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { GetSessionInfoDto, SignInDto, SignUpDto } from "./dto"
import { Response } from "express"
import { CookieService } from "./cookie.service"
import { AuthGuard } from "./auth.guard"
import { SessionInfo } from "./sessionInfoDecorator"

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
   constructor(
      private authService: AuthService,
      private cookieService: CookieService,
   ) {}

   @Post("sign-up")
   @ApiCreatedResponse()
   async signUp(@Body() body: SignUpDto, @Res({ passthrough: true }) res: Response) {
      const { accessToken } = await this.authService.signUp(body.login, body.password)
      this.cookieService.setToken(res, accessToken)
   }

   @Post("sign-in")
   @ApiOkResponse()
   @HttpCode(HttpStatus.OK)
   async signIn(@Body() body: SignInDto, @Res({ passthrough: true }) res: Response) {
      const { accessToken } = await this.authService.signIn(body.login, body.password)
      this.cookieService.setToken(res, accessToken)
   }

   @Post("sign-out")
   @ApiOkResponse()
   @HttpCode(HttpStatus.OK)
   @UseGuards(AuthGuard)
   signOut(@Res({ passthrough: true }) res: Response) {
      this.cookieService.removeToken(res)
   }

   @Get("session")
   @UseGuards(AuthGuard)
   @ApiOkResponse({ type: GetSessionInfoDto })
   getSessionInfo(@SessionInfo() session: GetSessionInfoDto) {
      return session
   }
}
