import { Module } from '@nestjs/common'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Define } from '../../define'
import { Product } from './entity/product.entity'
const entityList = [Product]

// support read-write separation
const ConnectionModule = [
  TypeOrmModule.forRootAsync({
    name: Define.mysql.writeConnection,
    useFactory: getMySQLOptions.bind(undefined, process.env.MYSQL_HOST)
  }),
  TypeOrmModule.forRootAsync({
    name: Define.mysql.readConnection,
    useFactory: getMySQLOptions.bind(undefined, process.env.MYSQL_REPLICA_HOST)
  })
]

const RepositoryModule = [
  TypeOrmModule.forFeature(entityList, Define.mysql.readConnection),
  TypeOrmModule.forFeature(entityList, Define.mysql.writeConnection)
]

@Module({
  imports: [...ConnectionModule, ...RepositoryModule],
  exports: RepositoryModule
})
export class MysqlModule {}

function getMySQLOptions(host: string): TypeOrmModuleOptions {
  return {
    host,
    type: 'mysql',
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    logging: process.argv.includes('--sql-log') ? true : ['error'],
    cache: {
      type: 'ioredis',
      options: {
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
        port: process.env.REDIS_PORT
      },
      duration: 5000
    },
    extra: {
      connectionLimit: 100,
      charset: 'utf8mb4_unicode_ci'
    },
    autoLoadEntities: true,
    keepConnectionAlive: true,
    bigNumberStrings: false,
    synchronize: false
  }
}
