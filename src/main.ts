import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger: Logger = new Logger('Main');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  await app.listen(3000, () => {
    logger.log('Nest app listening on port 3000');
  });
}
bootstrap();
