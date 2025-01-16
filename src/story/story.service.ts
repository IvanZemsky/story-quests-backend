import { InjectModel } from "@nestjs/mongoose"
import { Story } from "./story.schema"
import { Model, QueryOptions } from "mongoose"
import { OrderByFilter, SortByScenesAmount } from "./types/types"
import { setSortByLength } from "./helpers/setSortByLength"
import { setOrderByFilter } from "./helpers/setOrderByFilter"

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
      order: OrderByFilter,
   ): Promise<Story[]> {
      const query = this.setQuery(search, length)

      const sort = setOrderByFilter(order)

      const skip = (page > 0 ? page - 1 : 0) * limit

      const stories = await this.storyModel
         .find(query)
         .sort(sort)
         .skip(skip)
         .limit(limit)
         .populate("author", "login")

      return stories
   }

   async getStoryById(id: string) {
      const story = await this.storyModel.findById(id).populate("author", "login")
      return story
   }

   async getStoryCount(search: string, length: SortByScenesAmount): Promise<number> {
      const query = this.setQuery(search, length)
      return await this.storyModel.countDocuments(query).exec()
   }

   private setQuery(search: string, length: SortByScenesAmount): QueryOptions {
      const sceneCountQuery = setSortByLength(length)

      return {
         $or: [
            { description: { $regex: search, $options: "i" } },
            { name: { $regex: search, $options: "i" } },
         ],
         ...(sceneCountQuery && { sceneCount: sceneCountQuery }),
      }
   }
}
