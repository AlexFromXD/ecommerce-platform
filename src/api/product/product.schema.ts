import { ApiProperty } from '@nestjs/swagger'
import { Product } from './product.entity'

class Paging {
  @ApiProperty()
  count!: number

  @ApiProperty()
  total!: number
}

export class GetProductResponse {
  @ApiProperty({ type: Product, isArray: true })
  productList!: Product[]

  @ApiProperty({ type: Paging })
  paging!: Paging
}
