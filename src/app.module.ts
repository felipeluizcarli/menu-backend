import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const databaseURL =
          configService.get<string>('DATABASE_URL');

        const dbSchema =
          configService.get<string>('DATABASE_SCHEMA', 'public');

        if (!databaseURL) {
          throw new Error(
            'A variável de ambiente DATABASE_URL não foi encontrada!',
          );
        }

        return {
          type: 'postgres' as const,
          url: databaseURL,
          schema: dbSchema,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}