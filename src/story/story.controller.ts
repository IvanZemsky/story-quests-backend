import { Controller, Get, NotFoundException, Param, Query, Res } from '@nestjs/common';
import { StoryService } from './story.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Story } from './story.schema';
import { OrderByFilter, SortByScenesAmount } from './types/types';
import { Response } from 'express';

@ApiTags('Истории')
@Controller('stories')
export class StoryController {
  constructor(private storyService: StoryService) {}

  @ApiOperation({ summary: 'Получение всех историй (без сцен)' })
  @ApiResponse({
    status: 200,
    type: [Story],
    headers: {
      'X-Total-Count': {
        description: 'Общее количество историй',
        schema: {
          type: 'number',
        },
      },
    },
  })
  @Get()
  async getStories(
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('search') search: string = '',
    @Query('length') length: SortByScenesAmount = '',
    @Query('order') order: OrderByFilter = '',
    @Query('only_count') onlyCount: boolean = false,
    @Res() res: Response,
  ) {
    const count = await this.storyService.getStoryCount(search, length);

    res.setHeader('X-Total-Count', count);
    res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');

    if (!onlyCount) {
      const stories = await this.storyService.getAllStories(
        limit,
        page,
        search,
        length,
        order,
      );

      return res.json(stories);
    }

    return res.json([]);
  }

  @ApiOperation({ summary: 'Получение истории по id' })
  @ApiResponse({
    status: 200,
    type: Story,
  })
  @Get(':id')
  async getStoryById(@Param('id') id: string) {
    const story = await this.storyService.getStoryById(id)
    if (!story) {
      throw new NotFoundException('Story not found');
    }
    return story
  }
}
