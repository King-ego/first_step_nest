import { Module } from '@nestjs/common';
import { CarService } from './cars.service';
import { CarController } from './cars.controller';

@Module({
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
