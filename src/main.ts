import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
   const PORT = process.env.PORT!
   const app = await NestFactory.create(AppModule)

   const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:5000",
      "https://story-quests.vercel.app",
      "https://story-quests-backend.onrender.com",
   ]

   app.use(cookieParser())

   app.enableCors({
      origin: (origin, callback) => {
         if (!origin) return callback(null, true)

         const normalizedOrigin = origin.endsWith("/") ? origin.slice(0, -1) : origin

         if (allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true)
         } else {
            callback(new Error(`Origin "${origin}" not allowed by CORS`))
         }
      },
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
      credentials: true,
   })

   const config = new DocumentBuilder()
      .setTitle("REST API для веб-приложений StoryQuests")
      .build()

   const document = SwaggerModule.createDocument(app, config)
   SwaggerModule.setup("/", app, document)

   await app.listen(PORT)
}
bootstrap()
