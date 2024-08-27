import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";
import { IScene } from "src/story/types/types";

@Schema({collection: 'scenes'})
export class Scenes {
   @ApiProperty({description: 'Уникальный идентификатор истории'})
   @Prop({type: mongoose.Schema.Types.ObjectId})
   storyId: string

   @ApiProperty({description: 'Массив сцен'})
   @Prop({required: true})
   scenes: IScene[]
}

export type ScenesDocument = HydratedDocument<Scenes>
export const ScenesSchema = SchemaFactory.createForClass(Scenes)