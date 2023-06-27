import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { PrismaModule } from 'src/services/database/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ContactsController],
  providers: [ContactsService]
})
export class ContactsModule {}
