import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdensService } from './ordens.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Controller('ordens')
export class OrdensController {
  constructor(private readonly ordensService: OrdensService) {}

  @Post()
  create(@Body() createOrdenDto: CreateOrdenDto) {
    return this.ordensService.create(createOrdenDto);
  }

  @Get()
  findAll() {
    return this.ordensService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordensService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenDto: UpdateOrdenDto) {
    return this.ordensService.update(+id, updateOrdenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordensService.remove(+id);
  }
}
