import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users', versionKey: false })
export class User {
  @ApiProperty({
    example: '66cb6fb8ebae2e4b8fffd190',
    description: 'Уникальный идентификатор',
  })
  _id: string;

  @ApiProperty({
    example: 'Curry',
    description: 'Логин пользователя',
  })
  @Prop()
  login: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @Prop()
  password: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
