import { Module } from "@nestjs/common"
import { SceneService } from "./scene.service"
import { MongooseModule } from "@nestjs/mongoose"
import { Scene, SceneSchema } from "./scene.schema"

@Module({
   imports: [MongooseModule.forFeature([{ name: Scene.name, schema: SceneSchema }])],
   providers: [SceneService],
   exports: [SceneService],
})
export class ScenesModule {}
