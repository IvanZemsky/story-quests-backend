import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Scene } from "./scene.schema";
import { Model } from "mongoose";

@Injectable()
export class SceneService {
   constructor(
      @InjectModel(Scene.name)
      private sceneRepository: Model<Scene>
   ) {}

   async getScenesByStoryId(storyId: string) {
      const scenes = await this.sceneRepository.find({storyId})
      return scenes
   }

   async getScene(storyId: string, nextSceneId: string) {
      const scene = await this.sceneRepository.findOne({storyId, sceneId: nextSceneId})
      return scene
   }
}
