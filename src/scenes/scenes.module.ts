import { Module } from '@nestjs/common';
import { ScenesService } from './scenes.service';
import { ScenesController } from './scenes.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { Scenes, ScenesSchema } from "./scenes.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{name: Scenes.name, schema: ScenesSchema}])
  ],
  providers: [ScenesService],
  controllers: [ScenesController]
})
export class ScenesModule {}
