import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common'
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { Response } from 'express'
import { Repository } from 'typeorm'
import { Define } from '../../define'
import { GetProductQuery } from './product.dto'
import { Product } from './product.entity'
import { GetProductResponse } from './product.schema'

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(
    @InjectRepository(Product, Define.mysql.readConnection)
    private readonly _productRepository: Repository<Product>
  ) {}

  @Get('list')
  @ApiResponse({ type: GetProductResponse })
  @ApiQuery({ type: GetProductQuery })
  async getProduct(
    @Query() query: GetProductQuery
  ): Promise<GetProductResponse> {
    const [productList, total] = await this._productRepository.findAndCount({
      select: ['id', 'name', 'price', 'imageURL', 'descriptionURL'],
      where: {
        enable: 1
      },
      take: query.limit,
      skip: query.offset
    })

    return {
      productList,
      paging: {
        count: productList.length,
        total
      }
    }
  }

  @Get('/:productID/detail')
  @ApiResponse({ status: HttpStatus.OK, type: Product })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  async getProductDetail(@Res() res: Response, @Param('productID') id: number) {
    const product = await this._productRepository.findOne({
      select: ['id', 'name', 'price', 'imageURL', 'descriptionURL'],
      where: { id },
      cache: {
        id: `product_detail_${id}`,
        milliseconds: 600000 // cache 10 min
      }
    })
    product ? res.send(product).end() : res.status(HttpStatus.NOT_FOUND).end()
  }
}
