import { Module } from "@nestjs/common"
import { SceneService } from "./scene.service"
import { SceneController } from "./scene.controller"
import { MongooseModule } from "@nestjs/mongoose"
import { Scene, SceneSchema } from "./scene.schema"

@Module({
   imports: [MongooseModule.forFeature([{ name: Scene.name, schema: SceneSchema }])],
   providers: [SceneService],
   controllers: [SceneController],
})
export class ScenesModule {}
