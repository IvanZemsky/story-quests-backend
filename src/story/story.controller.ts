import { Controller, Get, Query } from '@nestjs/common';
import { StoryService } from "./story.service";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Story } from "./story.schema";
import { SortByFilter, SortByScenesAmount } from "./types/types";

@Controller('stories')
export class StoryController {
   constructor(
      private storyService: StoryService
   ) {}

   @ApiOperation({summary: "Получение всех историй (без сцен)"})
   @ApiResponse({status: 200, type: Story})
   @Get()
   getStories(
      @Query('limit') limit: number,
      @Query('page') page: number,
      @Query('search') search: string = "",
      @Query('length') length: SortByScenesAmount = "",
      @Query('filter') filter: SortByFilter = "",
   ) {
      return this.storyService.getAllStories(limit, page, search, length, filter)
   }
}
