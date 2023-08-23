import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { PrismaModule } from 'src/services/database/prisma.module';
import { AzureService } from 'src/services/azure/azure.service';

@Module({
  imports:[PrismaModule],
  controllers: [HotelsController],
  providers: [HotelsService,AzureService],
})
export class HotelsModule {}
