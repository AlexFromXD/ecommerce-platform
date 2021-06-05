import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const documentOptions = new DocumentBuilder().build()
  const document = SwaggerModule.createDocument(app, documentOptions)
  SwaggerModule.setup('document', app, document)

  app.enableShutdownHooks(['SIGTERM', 'SIGINT']).listen(3000)
}

bootstrap()
