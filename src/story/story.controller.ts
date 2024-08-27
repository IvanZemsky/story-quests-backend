import { Controller, Get } from '@nestjs/common';
import { StoryService } from "./story.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Story } from "./story.schema";

@Controller('stories')
export class StoryController {
   constructor(
      private storyService: StoryService
   ) {}

   @ApiOperation({summary: "Получение всех историй (без сцен)"})
   @ApiResponse({status: 200, type: Story})
   @Get()
   getAllStories() {
      return this.storyService.getAllStories()
   }
}
