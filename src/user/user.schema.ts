import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ collection: 'users' })
export class User {
  @ApiProperty({
    example: '66cb6fb8ebae2e4b8fffd190',
    description: 'Уникальный идентификатор',
  })
  private _id: string;

  @ApiProperty({
    example: 'Curry',
    description: 'Логин пользователя',
  })
  @Prop()
  login: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  @Prop()
  password: string;

  @ApiProperty({ example: '18', description: 'Количество сцен' })
  @Prop({ type: mongoose.Schema.Types.Date })
  registrationDate: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
