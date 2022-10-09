import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { Create, GetAll, GetOnly, Remove, Update } from './interface/person';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person) private readonly person: Repository<Person>,
  ) {}

  public async create(createPersonDto: CreatePersonDto): Promise<Create> {
    const data = await this.person.save(createPersonDto);
    return { data, text: 'create person sucess' };
  }

  public async findAll(options: IPaginationOptions): Promise<GetAll> {
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

    return { data, text: `This action returns all person` };
  }

  public async findOne(id: string): Promise<GetOnly> {
    const data = await this.person.findOne({
      relations: { animals: true },
      where: { id },
    });

    // const queryBuilder = this.person.createQueryBuilder('p');

    // queryBuilder.where('p.id = :id', { id });

    // queryBuilder.select([
    //   'p.id',
    //   'p.firstName',
    //   'p.lastName',
    //   'p.description',
    //   'p.nation',
    //   'p.isActive',
    //   'p.create_at',
    //   'p.update_at',
    // ]);

    // queryBuilder.leftJoinAndSelect('p.animals', 'animals');

    // const data = await queryBuilder.getOne();

    return {
      data,
      text: `This action returns a #${id} person`,
    };
  }

  public async update(
    id: string,
    updatePersonDto: UpdatePersonDto,
  ): Promise<Update> {
    await this.person.update(id, updatePersonDto);
    return {
      data: updatePersonDto,
      text: `This action updates a #${id} person`,
    };
  }

  public async remove(id: string): Promise<Remove> {
    try {
      await this.person.delete({ id });
    } catch (error) {
      console.log(error);
    }
    return { text: `This action removes a #${id} person` };
  }
}
