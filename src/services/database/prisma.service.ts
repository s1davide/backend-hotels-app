import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AwsService } from 'src/services/aws/aws.service';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private aws: AwsService
  ){
    super();
    
  }
  async onModuleInit() {
    if(process.env.DEVELOPMENT_DB!=="true"){
      await this.aws.getDatabaseSecrets()
    }
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
