import { Inject, Module } from '@nestjs/common';
import { configModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    configModule.forRoot({
      isGlobal: true,
      TypeOrmModule.forRootAsync({
        Inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          const databaseUrl = configService.get<string>('DATABASE_URL');
          const databaseSchema = configService.get<string>('DATABASE_SCHEMA', 'public');

          if (!databaseUrl) {
            throw new Error('A variável de ambiente DATABASE_URL não encontrada.');
          }

          return {
            type: 'postgres',
            url: databaseUrl,
            schema: databaseSchema,
            autoLoadEntities: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
