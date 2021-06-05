import { Module } from '@nestjs/common'
import { MysqlModule } from '../storage/mysql/mysql.module'

@Module({
  imports: [MysqlModule],
  controllers: [],
  providers: []
})
export class ApiModule {}
