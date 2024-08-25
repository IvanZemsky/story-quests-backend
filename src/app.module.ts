import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";

const USER_NAME = process.env.USER_NAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

const CONNECTION = `mongodb+srv://${USER_NAME}:${DB_PASSWORD}@cluster0.eljxn.mongodb.net/${DB_NAME}/?retryWrites=true&w=majority&appName=Cluster0`

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    MongooseModule.forRoot(CONNECTION)],

})
export class AppModule {}
