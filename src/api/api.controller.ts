import { Controller, Get } from '@nestjs/common'
import { ApiExcludeEndpoint } from '@nestjs/swagger'

@Controller()
export class ApiController {
  @ApiExcludeEndpoint()
  @Get()
  hc() {
    return
  }
}
