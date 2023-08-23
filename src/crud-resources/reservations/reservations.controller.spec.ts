import { Test, TestingModule } from '@nestjs/testing';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { AzureService } from 'src/services/azure/azure.service';
import { HotelsService } from '../hotels/hotels.service';
import { PrismaService } from 'src/services/database/prisma.service';
import { EmailClientMock } from '../../../__mocks__/azure-communication.mock';

jest.mock('@azure/communication-email', ()=>{
  return {EmailClient:jest.fn().mockImplementation(()=>EmailClientMock)}

});
describe('ReservationsController', () => {
  let controller: ReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationsController],
      providers: [ReservationsService, AzureService,HotelsService,PrismaService],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
