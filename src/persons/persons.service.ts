import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';

import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private usersRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    const { description, firstName, isActive, lastName, nation } =
      createPersonDto;

    const person = { firstName, lastName, description, nation, isActive };

    const newperson = await this.usersRepository.save(person);

    return { data: newperson, text: 'This action adds a new person' };
  }

  async findAll() {
    const data = await this.usersRepository.find();
    return { data, text: `This action returns all persons` };
  }

  async findOne(id: string) {
    const data = await this.usersRepository.findOneBy({ id });
    return { data, text: `This action returns a #${id} person` };
  }

  async update(id: string, updatePersonDto: UpdatePersonDto) {
    const { description, firstName, isActive, lastName, nation } =
      updatePersonDto;

    const person = { firstName, lastName, description, nation, isActive };

    await this.usersRepository.update({ id }, person);

    return { data: person, text: `This action updates a #${id} person` };
  }

  remove(id: string) {
    this.usersRepository.delete({ id });
    return { text: `This action removes a person with sucess` };
  }
}
