import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HotelsModule } from './crud-resources/hotels/hotels.module';
import { ReferencesModule } from './crud-resources/references/references.module';
import { PrismaService } from './services/database/prisma.service';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AzureService } from './services/azure/azure.service';
import { RoomsModule } from './crud-resources/rooms/rooms.module';
import { ReservationsModule } from './crud-resources/reservations/reservations.module';

@Module({
  imports: [ ConfigModule.forRoot({envFilePath:'.env'}), HotelsModule, ReferencesModule,
ServeStaticModule.forRoot({
  rootPath:join(__dirname,'..','public'),serveRoot:'/img'
}),
RoomsModule,
ReservationsModule],
  controllers: [AppController],
  providers: [AppService,PrismaService, AzureService],
})
export class AppModule { }
