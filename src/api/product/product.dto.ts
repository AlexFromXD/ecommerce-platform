import { ApiProperty } from '@nestjs/swagger'
import { IsInt, Max } from 'class-validator'

export class GetProductQuery {
  @Max(50)
  @IsInt()
  @ApiProperty()
  limit!: number

  @IsInt()
  @ApiProperty()
  offset!: number
}
