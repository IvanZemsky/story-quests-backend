import { Controller, Get, Query } from '@nestjs/common';
import { SceneService } from './scene.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Scene } from './scene.schema';

@ApiTags('Сцены')
@Controller('scenes')
export class SceneController {
  constructor(private sceneService: SceneService) {}

  @ApiOperation({ summary: 'Получение сцен для истории по id истории' })
  @ApiResponse({ status: 200, type: Scene })
  @Get()
  getScenesByStoryId(@Query('storyId') storyId: string) {
    return this.sceneService.getScenesByStoryId(storyId);
  }

  @ApiOperation({
    summary:
      'Получение одной сцены для истории по id истории и id следующей сцены',
  })
  @ApiResponse({ status: 200, type: Scene })
  @Get('one')
  getScene(
    @Query('storyId') storyId: string,
    @Query('nextSceneId') nextSceneId: string,
  ) {
    return this.sceneService.getScene(storyId, nextSceneId);
  }
}
