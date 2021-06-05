import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost): void {
    console.error(exception)
    let status = HttpStatus.INTERNAL_SERVER_ERROR
    let body: unknown = 'internal server error'
    if (exception instanceof HttpException) {
      status = exception.getStatus()
      body = exception.getResponse()
    }
    host.switchToHttp().getResponse<Response>().status(status).send(body).end()
  }
}
