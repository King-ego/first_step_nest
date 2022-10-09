import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';

import { PersonsService } from './persons.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Create, GetAll, GetOnly, Remove, Update } from './interface/person';

@Controller('api/persons')
export class PersonsController {
  constructor(private readonly service: PersonsService) {}

  @Post()
  @ApiTags('Persons')
  protected create(@Body() createPersonDto: CreatePersonDto): Promise<Create> {
    return this.service.create(createPersonDto);
  }

  @Get()
  @ApiTags('Persons')
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  protected findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 100,
  ): Promise<GetAll> {
    limit = limit > 100 ? 100 : limit;
    return this.service.findAll({ limit, page });
  }

  @Get(':id')
  @ApiTags('Persons')
  protected findOne(@Param('id') id: string): Promise<GetOnly> {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiTags('Persons')
  protected update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto,
  ): Promise<Update> {
    return this.service.update(id, updatePersonDto);
  }

  @Delete(':id')
  @ApiTags('Persons')
  protected remove(@Param('id') id: string): Promise<Remove> {
    return this.service.remove(id);
  }
}
