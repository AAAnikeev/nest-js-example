import { NestFactory } from '@nestjs/core';
import { readFileSync } from 'fs';
import { AppModule } from './app.module';

async function bootstrap() {
  //Add files with sertificates
  const httpsOptions = {
    key: readFileSync('./server.key'),
    cert: readFileSync('./server.crt'),
  }
  const app = await NestFactory.create(AppModule, {httpsOptions,});

  // Or use http
  //const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
