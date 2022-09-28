import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { CreateCarDTO, UpdateCarDTO } from 'src/cars/DTO/create-car.dto';
import { CreateCar, UpdateCar } from 'src/cars/Interface/car.interface';

import { CarService } from './cars.service';

@Controller('api/car')
export class CarController {
  constructor(private readonly carservice: CarService) {}

  @Get()
  getFound(): { found: string } {
    return this.carservice.getNothing();
  }

  @Get(':id')
  getOnlyOne(@Param('id') id: string): string {
    return this.carservice.getOne(id);
  }

  @Post()
  create(@Body() createcardto: CreateCarDTO): Promise<CreateCar> {
    const name = createcardto.name;
    const age = createcardto.age;
    const breed = createcardto.breed;
    return this.carservice.create(name, age, breed);
  }

  @Put(':id')
  update(
    @Body() updatecardto: UpdateCarDTO,
    @Param('id') id: string,
  ): UpdateCar {
    const name = updatecardto.name;
    const age = updatecardto.age;

    return this.carservice.update(name, age, id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): string {
    return this.carservice.delete(id);
  }
}
