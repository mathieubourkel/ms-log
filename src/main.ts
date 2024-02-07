import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.APP_PORT, process.env.APP_HOST);
  console.log(`[MS-LOG] URL : ${process.env.APP_HOST}:${process.env.APP_PORT} ||| MONGODB : ${process.env.MONGO_DNS}`)
}
bootstrap();
