import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './cases/categories/category.entity';
import { CategoryModule } from './cases/categories/category.module';
import { Product } from './cases/products/product.entity';
import { Spot } from './cases/spots/spot.entity';
import { GuestChecksModule } from './cases/guest-checks/guest-checks..module';
import { ProductModule } from './cases/products/product.module';
import { SpotModule } from './cases/spots/spot.module';

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

        
      }
    }),
    CategoryModule,
    ProductModule,
    SpotModule,
    GuestChecksModule,
  ],
})
export class AppModule {}