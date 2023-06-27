import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './crudResources/contacts/contacts.module';
import { AwsService } from './services/aws/aws.service';
import { AwsModule } from './services/aws/aws.module';
import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';


@Module({
  imports: [ContactsModule, AwsModule],
  controllers: [AppController],
  providers: [AppService, AwsService],
})
export class AppModule { }
