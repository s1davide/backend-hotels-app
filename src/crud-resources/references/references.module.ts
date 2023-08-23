import { Module } from '@nestjs/common';
import { ReferencesService } from './references.service';
import { ReferencesController } from './references.controller';
import { PrismaModule } from 'src/services/database/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ReferencesController],
  providers: [ReferencesService]
})
export class ReferencesModule {}
