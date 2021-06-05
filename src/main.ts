// load .env
require('dotenv').config()

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApiModule } from './api/api.module'

async function bootstrap() {
  const app = await NestFactory.create(ApiModule)
  const documentOptions = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, documentOptions)
  SwaggerModule.setup('document', app, document)

  app
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true
        }
      })
    )
    .listen(3000)
}

bootstrap()
