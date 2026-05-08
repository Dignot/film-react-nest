import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';

import { configProvider } from './app.config.provider';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { Film } from './films/entities/film.entity';
import { Schedule } from './films/entities/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),

    TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    return {
      type: 'postgres',
      host: config.get<string>('DATABASE_HOST', 'localhost'),
      port: config.get<number>('DATABASE_PORT', 5432),
      username: config.get<string>('DATABASE_USER', 'postgres'),
      password: config.get<string>('DATABASE_PASSWORD', ''),
      database: config.get<string>('DATABASE_NAME'),
      entities: [Film, Schedule],
    };
  },
}),
    ServeStaticModule.forRoot({
  rootPath: path.resolve(process.cwd(), 'public'),
}),
    FilmsModule,
    OrderModule,
  ],
  controllers: [],
  providers: [configProvider],
})
export class AppModule {}
