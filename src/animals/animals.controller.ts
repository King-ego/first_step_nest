import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

import { AnimalsService } from './animals.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PutUpdadeAnimal } from './dto/put-update-animal.dto';

import { Animal } from './entities/animal.entity';

@Controller('api/animals')
export class AnimalsController {
  constructor(private readonly animalsService: AnimalsService) {}

  @Post()
  @ApiTags('Animals')
  @ApiBody({ type: CreateAnimalDto })
  protected create(
    @Body() createAnimalDto: CreateAnimalDto,
  ): Promise<{ data: CreateAnimalDto; text: string }> {
    return this.animalsService.create(createAnimalDto);
  }

  @Get()
  @ApiTags('Animals')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  protected findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
  ): Promise<{ data: Pagination<Animal, IPaginationMeta>; text: string }> {
    limit = limit > 100 ? 100 : limit;
    return this.animalsService.findAll({ page, limit });
  }

  @Get(':id')
  @ApiTags('Animals')
  protected findOne(
    @Param('id') id: string,
  ): Promise<{ data: Animal[]; text: string }> {
    return this.animalsService.findOne(id);
  }

  @Patch(':id')
  @ApiTags('Animals')
  protected update(
    @Param('id') id: string,
    @Body() updateAnimalDto: UpdateAnimalDto,
  ): Promise<{ data: UpdateAnimalDto; text: string }> {
    return this.animalsService.update(id, updateAnimalDto);
  }

  @Put(':id')
  @ApiTags('Animals')
  protected updateSelect(
    @Param('id') id: string,
    @Body() putUpdateAnimal: PutUpdadeAnimal,
  ) {
    return this.animalsService.updateselect(id, putUpdateAnimal);
  }

  @Delete(':id')
  @ApiTags('Animals')
  protected remove(@Param('id') id: string): Promise<{ text: string }> {
    return this.animalsService.remove(id);
  }
}
