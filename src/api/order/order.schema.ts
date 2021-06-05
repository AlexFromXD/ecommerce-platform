import { ApiProperty } from '@nestjs/swagger'
import { Product } from './order.dto'

export class PutOrderResponse {
  @ApiProperty()
  orderID!: string

  @ApiProperty({ type: Product, isArray: true })
  productList!: Product[]

  @ApiProperty({ type: Date })
  createdAt!: Date

  @ApiProperty({ type: Date })
  updatedAt!: Date
}
