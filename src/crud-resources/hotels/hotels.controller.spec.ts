import { Test, TestingModule } from '@nestjs/testing';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { AzureService } from 'src/services/azure/azure.service';
import { PrismaModule } from 'src/services/database/prisma.module';
import { EmailClientMock } from '../../../__mocks__/azure-communication.mock';

jest.mock('@azure/communication-email', ()=>{
  return {EmailClient:jest.fn().mockImplementation(()=>EmailClientMock)}

});
describe('HotelsController', () => {
  let controller: HotelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[PrismaModule],
      controllers: [HotelsController],
      providers: [HotelsService,AzureService],
    }).compile();

    controller = module.get<HotelsController>(HotelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
