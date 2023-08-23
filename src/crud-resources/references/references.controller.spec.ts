import { Test, TestingModule } from '@nestjs/testing';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { AzureService } from 'src/services/azure/azure.service';
import { PrismaModule } from 'src/services/database/prisma.module';
import { EmailClientMock } from '../../../__mocks__/azure-communication.mock';

jest.mock('@azure/communication-email', ()=>{
  return {EmailClient:jest.fn().mockImplementation(()=>EmailClientMock)}

});
describe('ReferencesController', () => {
  let controller: ReferencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[PrismaModule],
      controllers: [ReferencesController],
      providers: [ReferencesService,AzureService],
    }).compile();

    controller = module.get<ReferencesController>(ReferencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
