import { Test, TestingModule } from '@nestjs/testing';
import { HotelsService } from './hotels.service';
import { AzureService } from 'src/services/azure/azure.service';
import { PrismaModule } from 'src/services/database/prisma.module';
import { EmailClientMock } from '../../../__mocks__/azure-communication.mock';

jest.mock('@azure/communication-email', ()=>{
  return {EmailClient:jest.fn().mockImplementation(()=>EmailClientMock)}

});
describe('HotelsService', () => {
  let service: HotelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[PrismaModule],
      providers: [HotelsService,AzureService],
    }).compile();

    service = module.get<HotelsService>(HotelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
