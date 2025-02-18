import { Injectable } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { Scene } from "./scene.schema"
import { Model } from "mongoose"

@Injectable()
export class SceneService {
   constructor(
      @InjectModel(Scene.name)
      private sceneModel: Model<Scene>,
   ) {}

   async getScenesByStoryId(storyId: string) {
      const scenes = await this.sceneModel.find({ storyId })
      return scenes
   }

   async getScene(searchParams: {
      _id?: string
      storyId?: string
      nextSceneId?: string
      sceneId?: string
   }) {
      const query = {}

      for (const key in searchParams) {
         if (searchParams[key]) {
            query[key] = searchParams[key]
         }
      }

      const scene = await this.sceneModel.findOne(query).lean()
      return scene
   }

   async getEndScenes(storyId: string) {
      const scenes = await this.sceneModel.find({ storyId, type: "end" })
      return scenes
   }

   async incrementPasses(storyId: string, sceneId: string) {
      const scene = await this.sceneModel.findOneAndUpdate(
         { storyId, sceneId },
         { $inc: { passes: 1 } },
         { new: true },
      )
      return scene
   }
}
