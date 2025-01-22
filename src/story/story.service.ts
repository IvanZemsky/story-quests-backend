import { InjectModel } from "@nestjs/mongoose"
import { Story } from "./story.schema"
import { Model, QueryOptions } from "mongoose"
import { LikedStoryDto, OrderByFilter, SortByScenesAmount } from "./types/types"
import { setSortByLength } from "./helpers/setSortByLength"
import { setOrderByFilter } from "./helpers/setOrderByFilter"
import { NotFoundException } from "@nestjs/common"
import { StoryLike } from "./storyLike.schema"

export class StoryService {
   constructor(
      @InjectModel(Story.name) private storyModel: Model<Story>,
      @InjectModel(StoryLike.name) private storyLikeModel: Model<StoryLike>,
   ) {}

   async getAllStories(
      search: string,
      length: SortByScenesAmount,
      order: OrderByFilter,
      userId?: string ,
      byUser?: string,
      limit: number = 0,
      page?: number,
   ): Promise<LikedStoryDto[]> {
      const query = this.setQuery(search, length)

      const sort = setOrderByFilter(order)

      const skip = page ? (page > 0 ? page - 1 : 0) * limit : 0

      const stories = await this.storyModel
         .find(query)
         .sort(sort)
         .skip(skip)
         .limit(limit)
         .populate("author", "login")
         .lean()

      const res = stories.map(async (story) => {
         if (userId) {
            const like = await this.storyLikeModel.findOne({ storyId: story._id, userId })
            return { ...story, isLiked: like ? true : false }
         } else {
            return { ...story, isLiked: false }
         }
      })

      return await Promise.all(res)
   }

   async getStoryById(storyId: string, userId: string | undefined) {
      const story = await this.storyModel.findById(storyId).populate("author", "login").lean()

      if (userId) {
         const like = await this.storyLikeModel.findOne({ storyId, userId })
         return { ...story, isLiked: like ? true : false }
      }

      return {...story, isLiked: false}
   }

   async getStoryCount(search: string, length: SortByScenesAmount): Promise<number> {
      const query = this.setQuery(search, length)
      return await this.storyModel.countDocuments(query).exec()
   }

   private setQuery(search: string, length: SortByScenesAmount, byUser?: string): QueryOptions {
      const sceneCountQuery = setSortByLength(length)

      return {
         $or: [
            { description: { $regex: search, $options: "i" } },
            { name: { $regex: search, $options: "i" } },
         ],
         ...(sceneCountQuery && { sceneCount: sceneCountQuery }),
         ...(byUser && { author: byUser })
      }
   }

   async updatePasses(id: string) {
      const story = await this.storyModel.findByIdAndUpdate(
         id,
         { $inc: { passes: 1 } },
         { new: true, useFindAndModify: false },
      )

      if (!story) {
         throw new NotFoundException(`Story with ID "${id}" not found`)
      }

      return {
         storyId: story._id,
         passes: story.passes,
      }
   }

   async toggleLike(storyId: string, userId: string) {
      const story = await this.storyModel.findById(storyId)

      if (!story) {
         throw new NotFoundException(`Story with ID "${storyId}" not found`)
      }

      const existingLike = await this.storyLikeModel.findOne({ storyId })

      let isLiked: boolean | null = null

      if (existingLike) {
         await this.storyLikeModel.findByIdAndDelete(existingLike._id)
         story.likes -= 1
         isLiked = false
      } else {
         await this.storyLikeModel.create({ storyId, userId })
         story.likes += 1
         isLiked = true
      }

      await story.save()

      return {
         storyId: story._id,
         likes: story.likes,
         isLiked,
      }
   }
}
