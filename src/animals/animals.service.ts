import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { PutUpdadeAnimal } from './dto/put-update-animal.dto';
import { Animal } from './entities/animal.entity';

import {
  Pagination,
  paginate,
  IPaginationOptions,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private readonly animal: Repository<Animal>,
  ) {}

  public async create(
    createAnimalDto: CreateAnimalDto,
  ): Promise<{ data: CreateAnimalDto; text: string }> {
    const data = await this.animal.save(createAnimalDto);
    return { data, text: 'This action adds a new animal' };
  }

  public async findAll(
    option: IPaginationOptions,
  ): Promise<{ data: Pagination<Animal, IPaginationMeta>; text: string }> {
    const queryBuilder = this.animal.createQueryBuilder('a');

    queryBuilder.select([
      'a.id',
      'a.name',
      'a.type',
      'a.age',
      'a.create_at',
      'a.update_at',
    ]);

    queryBuilder.orderBy('a.id', 'DESC');

    const data = await paginate<Animal>(queryBuilder, option);

    return { data, text: `This action returns all animals` };
  }

  public async findOne(id: string): Promise<{ data: Animal[]; text: string }> {
    const data = await this.animal.find({ where: { id } });
    return { data, text: `This action returns a #${id} animal` };
  }

  public async update(
    id: string,
    updateAnimalDto: UpdateAnimalDto,
  ): Promise<{ data: UpdateAnimalDto; text: string }> {
    await this.animal.update(id, updateAnimalDto);
    return {
      data: updateAnimalDto,
      text: `This action updates a #${id} animal`,
    };
  }

  public async updateselect(id: string, putUpdateAnimal: PutUpdadeAnimal) {
    await this.animal.update(id, putUpdateAnimal);
    return { data: putUpdateAnimal, text: 'animal update' };
  }

  public async remove(id: string): Promise<{ text: string }> {
    await this.animal.delete({ id });
    return { text: `This action removes a #${id} animal` };
  }
}
