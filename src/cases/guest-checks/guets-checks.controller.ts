import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGuestCheckDto } from './dto/create-guest-check';
import { GuestCheck } from './guest-check.entity';
import { GuestChecksService } from './guest-checks.service';


@Controller('guest-checks')
export class GuestChecksController {
  constructor(private readonly service: GuestChecksService) {}

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<GuestCheck> {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGuestCheckDto): Promise<GuestCheck> {
    return this.service.create(dto);
  }

  @Patch(':id')
  close(
    @Param('id', ParseUUIDPipe)
    id: string,
  ): Promise<GuestCheck> {
    return this.service.close(id);
  }

}