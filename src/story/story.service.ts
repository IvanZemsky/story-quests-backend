import { InjectModel } from '@nestjs/mongoose';
import { Story } from './story.schema';
import { Model } from 'mongoose';

export class StoryService {
   constructor(
     @InjectModel(Story.name)
     private storyModel: Model<Story>
   ) {}
 
   async getAllStories(): Promise<Story[]> {
     const stories = await this.storyModel
       .find()
       .populate('author', 'login')
     return stories
   }
 }
