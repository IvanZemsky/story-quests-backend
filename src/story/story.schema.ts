import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema({ collection: 'stories' })
export class Story {

   @ApiProperty({
      example: '66cb6fb8ebae2e4b8fffd190',
      description: 'Уникальный идентификатор',
    })
   private _id: string

  @ApiProperty({ example: 'Mystery of the Ancient Temple', description: 'Имя истории'})
  @Prop()
  name: string;

  @ApiProperty({
    example:
      'You embarked on an expedition to explore a mysterious ancient temple filled with secrets and dangers.',
    description: 'Описание истории',
  })
  @Prop()
  description: string;

  @ApiProperty({example: 'https://images.unsplash.com/photo-123', description: 'Ссылка на изображение',})
  @Prop()
  img: string;

  @ApiProperty({ example: '18', description: 'Количество сцен' })
  @Prop()
  sceneCount: number;
}

export type StoryDocument = HydratedDocument<Story>;
export const StorySchema = SchemaFactory.createForClass(Story);
