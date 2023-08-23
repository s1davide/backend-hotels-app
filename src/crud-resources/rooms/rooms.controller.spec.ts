import { Test, TestingModule } from '@nestjs/testing';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { AzureService } from 'src/services/azure/azure.service';
import { PrismaModule } from 'src/services/database/prisma.module';
import { EmailClientMock } from '../../../__mocks__/azure-communication.mock';

jest.mock('@azure/communication-email', ()=>{
  return {EmailClient:jest.fn().mockImplementation(()=>EmailClientMock)}

});
describe('RoomsController', () => {
  let controller: RoomsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [RoomsController],
      providers: [RoomsService, AzureService],
    }).compile();

    controller = module.get<RoomsController>(RoomsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
