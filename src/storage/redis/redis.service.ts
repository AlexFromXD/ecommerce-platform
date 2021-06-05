import { Logger } from '@nestjs/common'
import Redis from 'ioredis'

export class RedisService {
  private readonly _client: Redis.Redis
  private readonly _logger = new Logger(RedisService.name)

  constructor() {
    this._client = new Redis({
      host: process.env.REDIS_HOST,
      password: process.env.REDIS_PASSWORD,
      port: Number(process.env.REDIS_PORT),
      retryStrategy(times) {
        return 50 * Math.pow(2, times)
      }
    })
      .once('ready', () => {
        this._logger.log('redis connection is ready')
      })
      .on('reconnecting', () => {
        this._logger.warn('reconnect to redis server')
      })
      .on('error', err => {
        this._logger.error(err)
      })
  }

  getClient(): Redis.Redis {
    return this._client
  }
}
