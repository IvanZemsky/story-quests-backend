import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Story } from "./story.schema";
import { Model } from "mongoose";

@Injectable()
export class StoryService {
   constructor(
      @InjectModel(Story.name)
      private storyModel: Model<Story>
   ) {}

   async getAllStories(): Promise<Story[]> {
      const stories = this.storyModel.find().exec()
      return stories
   }
}
