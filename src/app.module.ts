import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { StoryModule } from './story/story.module';
import { ScenesModule } from './scenes/scenes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@cluster0.eljxn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`,
    ),
    StoryModule,
    ScenesModule,
  ],
})
export class AppModule {}