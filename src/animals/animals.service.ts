import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { Animal } from './entities/animal.entity';

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

  public async findAll() {
    const data = await this.animal.find();
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

  public async remove(id: string): Promise<{ text: string }> {
    await this.animal.delete({ id });
    return { text: `This action removes a #${id} animal` };
  }
}
