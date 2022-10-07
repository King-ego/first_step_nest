import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
  IPaginationMeta,
} from 'nestjs-typeorm-paginate';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person) private readonly person: Repository<Person>,
  ) {}

  public async create(
    createPersonDto: CreatePersonDto,
  ): Promise<{ data: CreatePersonDto; text: string }> {
    const data = await this.person.save(createPersonDto);
    return { data, text: 'create person sucess' };
  }

  // public async findAll() {
  //   const data = await this.person.find();
  //   return { data, text: 'find all persons' };
  // }

  //typi : Promise<Pagination<Person>>
  public async findAll(
    options: IPaginationOptions,
  ): Promise<{ data: Pagination<Person, IPaginationMeta> }> {
    const queryBuilder = this.person.createQueryBuilder('h');

    queryBuilder.select([
      'h.id',
      'h.firstName',
      'h.lastName',
      'h.description',
      'h.nation',
      'h.isActive',
      'h.create_at',
      'h.update_at',
    ]);

    queryBuilder.leftJoinAndSelect('h.animals', 'animals');

    queryBuilder.orderBy('h.create_at', 'DESC');

    const data = await paginate<Person>(queryBuilder, options);

    return { data };
  }

  public async findOne(id: string): Promise<{ data: Person[]; text: string }> {
    // const data = await this.person.findOneBy({ id });
    const data = await this.person.find({
      relations: { animals: true },
      where: { id },
    });

    return {
      data,
      text: `This action returns a #${id} person`,
    };
  }

  public async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<{ data: UpdatePersonDto; text: string }> {
    await this.person.update(id, updatePersonDto);
    return {
      data: updatePersonDto,
      text: `This action updates a #${id} person`,
    };
  }

  public async remove(id: string): Promise<{ text: string }> {
    try {
      await this.person.delete({ id });
    } catch (error) {
      console.log(error);
    }
    return { text: `This action removes a #${id} person` };
  }
}
