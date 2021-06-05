import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, IsUUID, ValidateNested } from 'class-validator'

export class Product {
  @IsInt()
  @ApiProperty()
  productID!: number

  @IsInt()
  @ApiProperty()
  quantity!: number
}

export class PutOrderBody {
  @IsOptional()
  @IsUUID('4')
  @ApiProperty({
    required: false,
    nullable: true
  })
  orderID?: string

  @Type(() => Product)
  @ValidateNested({ each: true })
  @ApiProperty({ type: Product, isArray: true })
  productList!: Product[]
}
