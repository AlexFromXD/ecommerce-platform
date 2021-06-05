import {
  Body,
  Controller,
  HttpStatus,
  Put,
  Req,
  Res,
  UseGuards
} from '@nestjs/common'
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger'
import { InjectRepository } from '@nestjs/typeorm'
import { Request, Response } from 'express'
import { Repository } from 'typeorm'
import { Define } from '../../define'
import { AuthenticationGuard } from '../api.guard'
import { PutOrderBody } from './order.dto'
import { Order, OrderDetail } from './order.entity'
import { PutOrderResponse } from './order.schema'

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    @InjectRepository(Order, Define.mysql.writeConnection)
    private readonly _orderRepository: Repository<Order>
  ) {}

  @Put()
  @UseGuards(AuthenticationGuard)
  @ApiHeader({
    name: 'x-user-session',
    description: 'b61c9a51-b750-4353-a0f2-faaa1a1d8431'
  })
  @ApiBody({ type: PutOrderBody })
  @ApiResponse({ status: HttpStatus.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.OK, type: PutOrderResponse })
  async putOrder(
    @Req() req: Request,
    @Res() res: Response,
    @Body()
    body: PutOrderBody
  ) {
    const userID = req.getUserID()

    let order: Order | undefined
    if (body.orderID) {
      order = await this._orderRepository.findOne({
        where: {
          uuid: body.orderID,
          userID
        },
        relations: ['orderDetailList']
      })

      if (!order) {
        return res.status(HttpStatus.NOT_FOUND).end()
      }
    } else {
      order = new Order({
        userID,
        orderDetailList: []
      })
    }

    const newProductQuantityMap: { [productID: number]: number } = {}
    for (const product of body.productList) {
      newProductQuantityMap[product.productID] = product.quantity
    }

    const originProductQuantityMap: { [productID: number]: number } = {}
    for (const detail of order.orderDetailList as OrderDetail[]) {
      originProductQuantityMap[detail.productID] =
        newProductQuantityMap[detail.productID] || 0
    }

    Object.assign(originProductQuantityMap, newProductQuantityMap)

    const orderDetailList = Object.entries(originProductQuantityMap).map(
      x =>
        new OrderDetail({
          productID: Number(x[0]),
          quantity: x[1]
        })
    )
    order.orderDetailList = orderDetailList
    order = await this._orderRepository.save(order)

    const resp: PutOrderResponse = {
      orderID: order.uuid,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      productList: orderDetailList.map(x => {
        return {
          productID: x.productID,
          quantity: x.quantity
        }
      })
    }

    res.send(resp).end()
  }
}
