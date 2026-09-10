import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuestChecksController } from './guest-checks.controller';
import { GuestChecksService } from './guest-checks.service';
import { Spot } from '../spots/spot.entity';
import { GuestCheck } from './guest-checks.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Spot, GuestCheck])],
  controllers: [GuestChecksController],
  providers: [GuestChecksService],
  exports: [GuestChecksService],
})
export class GuestChecksModule {}