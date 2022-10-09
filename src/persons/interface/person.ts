import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

import { CreatePersonDto } from '../dto/create-person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { Person } from '../entities/person.entity';

export interface Create {
  data: CreatePersonDto;
  text: string;
}

export interface GetAll {
  data: Pagination<Person, IPaginationMeta>;
  text: string;
}

export interface GetOnly {
  data: Person;
  text: string;
}

export interface Remove {
  text: string;
}

export interface Update {
  data: UpdatePersonDto;
  text: string;
}
