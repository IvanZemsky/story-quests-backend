import { ApiProperty } from "@nestjs/swagger"

export class SignUpDto {
   @ApiProperty({
      example: "Curry",
   })
   login: string

   @ApiProperty({
      example: "1234"
   })
   password: string
}

export class SignInDto {
   @ApiProperty({
      example: "Curry",
   })
   login: string

   @ApiProperty({
      example: "1234"
   })
   password: string
}

export class GetSessionInfoDto {
   @ApiProperty({
      example: "66e047ae77452b96c9efe17b",
   })
   id: string

   @ApiProperty({
      example: "Curry"
   })
   login: string

   @ApiProperty()
   iat: number

   @ApiProperty()
   exp: number
}