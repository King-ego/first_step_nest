import { IPaginationMeta, Pagination } from 'nestjs-typeorm-paginate';

import { CreateAnimalDto } from '../dto/create-animal.dto';
import { PutUpdadeAnimal } from '../dto/put-update-animal.dto';
import { Animal } from '../entities/animal.entity';

export interface Create {
  data: CreateAnimalDto;
  text: string;
}

export interface Update {
  data: PutUpdadeAnimal;
  text: string;
}

export interface GetAll {
  data: Pagination<Animal, IPaginationMeta>;
  text: string;
}

export interface GetOnly {
  data: Animal;
  text: string;
}

export interface Remove {
  text: string;
}
