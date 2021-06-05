import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable
} from '@nestjs/common'
import { Request, Response } from 'express'
import { RedisService } from '../storage/redis/redis.service'

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    @Inject(RedisService)
    private readonly _redisService: RedisService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const response = context.switchToHttp().getResponse<Response>()
    const session = request.headers['x-user-session']
    if (!session || typeof session !== 'string') {
      response.status(HttpStatus.UNAUTHORIZED).end()
      return false
    }

    const userID = await this._redisService.getClient().get(session)

    if (!userID) {
      response.status(HttpStatus.UNAUTHORIZED).end()
      return false
    }

    request.getUserID = () => Number(userID)
    return true
  }
}
