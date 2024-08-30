import { InjectModel } from '@nestjs/mongoose';
import { Story } from './story.schema';
import { Model, QueryOptions } from 'mongoose';
import { SortByFilter, SortByScenesAmount } from "./types/types";
import { setSortByLength } from "./helpers/setSortByLength";

export class StoryService {
  constructor(
    @InjectModel(Story.name)
    private storyModel: Model<Story>,
  ) {}

  async getAllStories(
    limit: number,
    page: number,
    search: string,
    length: SortByScenesAmount,
    filter: SortByFilter
  ): Promise<Story[]> {
    const sceneCountQuery = setSortByLength(length);

    const query: QueryOptions = {
      $or: [
        { description: { $regex: search, $options: 'i' } },
        { name: { $regex: search, $options: 'i' } },
      ],
      ...(sceneCountQuery && { sceneCount: sceneCountQuery }),
    };

    const stories = await this.storyModel
      .find(query)
      .skip(page * limit)
      .limit(limit)
      .populate('author', 'login');
    return stories;
  }
}
