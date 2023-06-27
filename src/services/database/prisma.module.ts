import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AwsModule } from 'src/services/aws/aws.module';

@Module({
  imports:[AwsModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

