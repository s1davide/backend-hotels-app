import { Test, TestingModule } from '@nestjs/testing';
import { ReferencesService } from './references.service';
import { PrismaModule } from 'src/services/database/prisma.module';
import { PrismaService } from 'src/services/database/prisma.service';
import { EmailClientMock } from '../../../__mocks__/azure-communication.mock';

jest.mock('@azure/communication-email', ()=>{
  return {EmailClient:jest.fn().mockImplementation(()=>EmailClientMock)}

});
describe('ReferencesService', () => {
  let service: ReferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[PrismaModule],
      providers: [ReferencesService,PrismaService],
    }).compile();

    service = module.get<ReferencesService>(ReferencesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
