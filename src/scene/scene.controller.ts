import { Controller, Get, Query } from '@nestjs/common';
import { SceneService } from './scene.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Scene } from './scene.schema';

@Controller('scenes')
export class SceneController {
  constructor(private sceneService: SceneService) {}

  @ApiOperation({ summary: 'Получение сцен для истории по id истории' })
  @ApiResponse({ status: 200, type: Scene })
  @Get()
  getScenesByStoryId(@Query('storyId') storyId: string) {
    return this.sceneService.getScenesByStoryId(storyId);
  }
}
