import { StoryService } from "./story.service"
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger"
import { Story } from "./schemas/story.schema"
import { OrderByFilter, SortByScenesAmount } from "./types/types"
import { Response } from "express"
import {
   Controller,
   Get,
   Res,
   Param,
   NotFoundException,
   Patch,
   HttpCode,
   Query,
   UseGuards,
   UseInterceptors,
   Body,
   Put,
} from "@nestjs/common"
import { AuthGuard } from "src/auth/auth.guard"
import { GetSessionInfoDto } from "src/auth/dto"
import { SessionInfo } from "src/auth/sessionInfoDecorator"
import { SessionInterceptor } from "src/auth/sessionInterseptor"
import { CreateStoryResultDto } from "./story.dto"
import { SceneService } from "src/scene/scene.service"

@ApiTags("Истории")
@Controller("stories")
export class StoryController {
   constructor(
      private storyService: StoryService,
      private sceneService: SceneService,
   ) {}

   @ApiOperation({ summary: "Получение всех историй (без сцен)" })
   @ApiResponse({
      status: 200,
      type: [Story],
      headers: {
         "X-Total-Count": {
            description: "Общее количество историй",
            schema: {
               type: "number",
            },
         },
      },
   })
   @ApiQuery({ name: "limit", required: false })
   @ApiQuery({ name: "page", required: false })
   @ApiQuery({ name: "search", required: false })
   @ApiQuery({ name: "length", required: false })
   @ApiQuery({ name: "order", required: false })
   @ApiQuery({ name: "only_count", required: false })
   @UseInterceptors(SessionInterceptor)
   @Get()
   async getStories(
      @Res() res: Response,
      @SessionInfo() session: GetSessionInfoDto,
      @Query("limit") limit?: number,
      @Query("page") page?: number,
      @Query("search") search: string = "",
      @Query("length") length: SortByScenesAmount = "",
      @Query("order") order: OrderByFilter = "",
      @Query("byUser") byUser?: string,
      @Query("only_count") onlyCount: boolean = false,
   ) {
      const userId = session?.id
      const count = await this.storyService.getStoryCount(search, length)

      res.setHeader("X-Total-Count", count)
      res.setHeader("Access-Control-Expose-Headers", "X-Total-Count")

      if (!onlyCount) {
         const stories = await this.storyService.getAllStories(
            search,
            length,
            order,
            userId,
            byUser,
            limit,
            page,
         )

         return res.json(stories)
      }

      return res.json([])
   }

   @ApiOperation({ summary: "Получение истории по id" })
   @ApiResponse({
      status: 200,
      type: Story,
   })
   @UseInterceptors(SessionInterceptor)
   @Get(":id")
   async getStoryById(
      @Param("id") id: string,
      @SessionInfo() session: GetSessionInfoDto,
   ) {
      const userId = session?.id
      const story = await this.storyService.getStoryById(id, userId)
      if (!story) {
         throw new NotFoundException("Story not found")
      }
      return story
   }

   @ApiOperation({ summary: "Увеличение количества прохождений истории" })
   @ApiResponse({ status: 200 })
   @Patch(":id/passes")
   @HttpCode(200)
   async updatePasses(@Param("id") id: string) {
      const updatedPasses = await this.storyService.updatePasses(id)
      return updatedPasses
   }

   @ApiOperation({ summary: "Переключение лайка" })
   @ApiResponse({ status: 200 })
   @Patch(":id/like")
   @UseGuards(AuthGuard)
   async toggleLike(
      @Param("id") storyId: string,
      @SessionInfo() session: GetSessionInfoDto,
   ) {
      const userId = session.id
      const res = await this.storyService.toggleLike(storyId, userId)
      return res
   }

   @Get(":id/results/:userId")
   async getUserResult(@Param("id") storyId: string, @Param("userId") userId: string) {
      const res = await this.storyService.getUserResult({ storyId, userId })

      if (!res) {
         throw new NotFoundException("result-not-found")
      }

      const scene = await this.sceneService.getScene({
         storyId,
         sceneId: res.resultSceneId,
      })

      return { ...res, scene }
   }

   @Put(":id/results")
   @UseGuards(AuthGuard)
   async setResult(@Body() body: CreateStoryResultDto, @Param("id") id: string) {
      const res = await this.storyService.setResult({ id, ...body })
      return res
   }
}
