import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { PutUpdadeAnimal } from './dto/put-update-animal.dto';
import { Animal } from './entities/animal.entity';

import { Create, GetAll, GetOnly, Update, Remove } from './interface/animal';

import { paginate, IPaginationOptions } from 'nestjs-typeorm-paginate';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private readonly animal: Repository<Animal>,
  ) {}

  public async create(createAnimalDto: CreateAnimalDto): Promise<Create> {
    const data = await this.animal.save(createAnimalDto);
    return { data, text: 'This action adds a new animal' };
  }

  public async findAll(option: IPaginationOptions): Promise<GetAll> {
    // get all without query and paginate
    // const newdata = await this.animal.find({
    //   relations: { person: true },
    //   take: Number(option.limit),
    //   skip: Number(option.page),
    //   order: {
    //     person: {
    //       id: 'ASC',
    //     },
    //   },
    // });

    //get all with query and paginate
    const queryBuilder = this.animal.createQueryBuilder('a');

    queryBuilder.select([
      'a.id',
      'a.name',
      'a.type',
      'a.age',
      'a.create_at',
      'a.update_at',
    ]);

    queryBuilder.leftJoinAndSelect('a.person', 'person');

    queryBuilder.orderBy('a.id', 'DESC');

    const data = await paginate<Animal>(queryBuilder, option);

    return { data, text: `This action returns all animals` };
  }

  public async findOne(id: string): Promise<GetOnly> {
    const data = await this.animal.findOne({
      where: { id },
      relations: { person: true },
    });
    // const queryBuilder = this.animal.createQueryBuilder('a');

    // queryBuilder.where({ id });
    // queryBuilder.where('a.id = :id', { id });

    // queryBuilder.select([
    //   'a.id',
    //   'a.name',
    //   'a.type',
    //   'a.age',
    //   'a.create_at',
    //   'a.update_at',
    // ]);

    // queryBuilder.leftJoinAndSelect('a.person', 'person');

    // const data = await queryBuilder.getOne();

    return { data, text: `This action returns a #${id} animal` };
  }

  public async update(
    id: string,
    putUpdateAnimal: PutUpdadeAnimal,
  ): Promise<Update> {
    await this.animal.update(id, putUpdateAnimal);
    return { data: putUpdateAnimal, text: 'animal update' };
  }

  public async remove(id: string): Promise<Remove> {
    await this.animal.delete({ id });
    return { text: `This action removes a #${id} animal` };
  }
}
