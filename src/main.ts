// load .env
require('dotenv').config()

import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ApiModule } from './api/api.module'

async function bootstrap() {
  const app = await NestFactory.create(ApiModule)

  const documentOptions = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, documentOptions)
  SwaggerModule.setup('document', app, document)

  app.enableShutdownHooks(['SIGTERM', 'SIGINT']).listen(3000)
}

bootstrap()
