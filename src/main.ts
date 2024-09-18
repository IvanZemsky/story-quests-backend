import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const allowedOrigins = ['http://localhost:3000', 'https://story-quests.vercel.app']

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle("REST API для веб-приложений StoryQuests")
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document);

  await app.listen(PORT);
}
bootstrap();
