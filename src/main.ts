import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from 'nestjs-prisma';
import { HttpStatus } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const {httpAdapter}=app.get(HttpAdapterHost);
  app.enableCors({origin:process.env.FRONTEND_URL_ALLOWED_CORS})
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter,{
    P2002: HttpStatus.UNPROCESSABLE_ENTITY
  }))
  await app.listen(parseInt(process.env.BACKEND_PORT)||3002);
}
bootstrap();
