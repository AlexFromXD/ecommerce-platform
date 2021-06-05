import { Test, TestingModule } from '@nestjs/testing'
import { strictEqual } from 'assert'
import { AppController } from './app.controller'
import { AppService } from './app.service'

context('AppController', () => {
  let appController: AppController

  before(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService]
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  it('should return "Hello World!"', () => {
    strictEqual(appController.getHello(), 'Hello World!')
  })
})
