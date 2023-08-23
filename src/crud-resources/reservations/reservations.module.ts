import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { AzureService } from 'src/services/azure/azure.service';
import { HotelsModule } from '../hotels/hotels.module';
import { HotelsService } from '../hotels/hotels.service';
import { PrismaService } from 'src/services/database/prisma.service';

@Module({
  imports:[HotelsModule],
  controllers: [ReservationsController],
  providers: [ReservationsService, AzureService,PrismaService,HotelsService]
})
export class ReservationsModule {}
