import { Controller, Get, Param, Patch, Query } from "@nestjs/common"
import { SceneService } from "./scene.service"
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Scene } from "./scene.schema"

@ApiTags("Сцены")
@Controller("scenes")
export class SceneController {
   constructor(private sceneService: SceneService) {}

   @ApiOperation({ summary: "Получение сцен для истории по id истории" })
   @ApiResponse({ status: 200, type: Scene })
   @Get()
   async getScenesByStoryId(@Query("storyId") storyId: string) {
      return await this.sceneService.getScenesByStoryId(storyId)
   }

   // @ApiOperation({
   //    summary: "Получение одной сцены для истории по id истории и id следующей сцены",
   // })
   // @ApiResponse({ status: 200, type: Scene })
   // @Get("one")
   // async getScene(
   //    @Query("id") id: string,
   //    @Query("story_id") storyId: string,
   //    @Query("next_scene_id") nextSceneId: string,
   //    @Query("story_scene_id") sceneId: string
   // ) {
   //    const res = await this.sceneService.getScene({storyId, nextSceneId, sceneId, _id: id})
   //    return res
   // }

   @Patch(":storyId/passes/:sceneId")
   async incrementPasses(@Param("storyId") storyId: string, @Param("sceneId") sceneId: string) {
      return await this.sceneService.incrementPasses(storyId, sceneId)
   }

   @Get(":storyId/results")
   async getStatistics(@Param("storyId") storyId: string) {
      const endScenes = await this.sceneService.getEndScenes(storyId)
      return endScenes
   }
}
