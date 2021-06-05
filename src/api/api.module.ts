import { Module } from '@nestjs/common'
import { MysqlModule } from '../storage/mysql/mysql.module'
import { RedisModule } from '../storage/redis/redis.module'
import { OrderController } from './order/order.controller'
import { ProductController } from './product/product.controller'

@Module({
  imports: [MysqlModule, RedisModule],
  controllers: [ProductController, OrderController],
  providers: []
})
export class ApiModule {}
