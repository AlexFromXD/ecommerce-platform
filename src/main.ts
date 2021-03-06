// load .env
require('dotenv').config()

import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { start } from 'elastic-apm-node'
import { ApiExceptionFilter } from './api/api.exception'
import { ApiModule } from './api/api.module'

async function bootstrap() {
  start()
  const app = await NestFactory.create(ApiModule)
  const documentOptions = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, documentOptions)
  SwaggerModule.setup('document', app, document)

  app
    .useGlobalFilters(new ApiExceptionFilter())
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
