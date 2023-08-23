import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { AzureService } from 'src/services/azure/azure.service';
import { PrismaModule } from 'src/services/database/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [RoomsController],
  providers: [RoomsService,AzureService]
})
export class RoomsModule {}
