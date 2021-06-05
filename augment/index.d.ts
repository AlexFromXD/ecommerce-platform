declare namespace NodeJS {
  export interface ProcessEnv {
    MYSQL_HOST: string
    MYSQL_REPLICA_HOST: string
    MYSQL_USERNAME: string
    MYSQL_PASSWORD: string
    MYSQL_PORT: string
    MYSQL_DATABASE: string

    REDIS_HOST: string
    REDIS_PASSWORD: string
    REDIS_PORT: string
  }
}
