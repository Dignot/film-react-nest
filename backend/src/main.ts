import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DevLogger } from './logger/dev.logger';
import { JsonLogger } from './logger/json.logger';
import { TskvLogger } from './logger/tskv.logger';

async function bootstrap() {
  const loggerType = process.env.LOGGER || 'tskv';
  let logger: any;
  switch (loggerType) {
    case 'dev':
      logger = new DevLogger();
      break;
    case 'json':
      logger = new JsonLogger();
      break;
    case 'tskv':
    default:
      logger = new TskvLogger();
      break;
  }

  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  app.useLogger(logger);
  await app.listen(4000);
  console.log('✅ Приложение запущено');
  console.log('✅ MongoDB подключена');
}
bootstrap();
