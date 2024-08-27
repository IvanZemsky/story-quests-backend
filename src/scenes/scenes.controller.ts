import { Controller, Get, Query } from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Scenes } from './scenes.schema';

@Controller('scenes')
export class ScenesController {
  constructor(private scenesService: ScenesService) {}

  @ApiOperation({ summary: 'Получение сцен для истории по id истории' })
  @ApiResponse({ status: 200, type: Scenes })
  @Get()
  getScenesByStoryId(@Query('storyId') storyId: string) {
    return this.scenesService.getScenesByStoryId(storyId);
  }
}
