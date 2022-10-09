import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';

import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { PutUpdadeAnimal } from './dto/put-update-animal.dto';

import { Create, GetAll, GetOnly, Remove, Update } from './interface/animal';

@Controller('api/animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @ApiTags('Animals')
  @ApiBody({ type: CreateAnimalDto })
  protected create(@Body() createAnimalDto: CreateAnimalDto): Promise<Create> {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  @ApiTags('Animals')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  protected findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
  ): Promise<GetAll> {
    limit = limit > 100 ? 100 : limit;
    return this.animalsService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiTags('Animals')
  protected findOne(@Param('id') id: string): Promise<GetOnly> {
    return this.animalsService.findOne(id);
  }

  @Put(':id')
  @ApiTags('Animals')
  protected update(
    @Param('id') id: string,
    @Body() putUpdateAnimal: PutUpdadeAnimal,
  ): Promise<Update> {
    return this.animalsService.update(id, putUpdateAnimal);
  }

  @Delete(':id')
  @ApiTags('Animals')
  protected remove(@Param('id') id: string): Promise<Remove> {
    return this.animalsService.remove(id);
  }
}
