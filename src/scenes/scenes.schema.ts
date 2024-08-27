import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { IScene } from 'src/story/types/types';
import { sceneExample } from './docs/docs';

@Schema({ collection: 'scenes' })
export class Scenes {
  @ApiProperty({
    description: 'Уникальный идентификатор истории',
    example: '66cb6fb8ebae2e4b8fffd190',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  storyId: string;

  @ApiProperty({
    description: 'Массив сцен',
    example: sceneExample,
  })
  @Prop({ required: true })
  scenes: IScene[];
}

export type ScenesDocument = HydratedDocument<Scenes>;
export const ScenesSchema = SchemaFactory.createForClass(Scenes);
