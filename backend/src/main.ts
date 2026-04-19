import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/afisha');
  app.enableCors();
  await app.listen(4000);
  console.log('✅ Приложение запущено');
  console.log('✅ MongoDB подключена');
}
bootstrap();
