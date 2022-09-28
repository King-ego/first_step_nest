import { Injectable } from '@nestjs/common';

import { CreateCar, UpdateCar } from 'src/cars/Interface/car.interface';

@Injectable()
export class CarService {
  getNothing(): { found: string } {
    return { found: 'nothing' };
  }
  async create(name: string, age: number, breed: string): Promise<CreateCar> {
    return { name, age, breed };
  }

  getOne(id: string): string {
    return `There is id = ${id}`;
  }

  update(name: string, age: number, id: string): UpdateCar {
    return { name, age, id, complet: 'completd stage basic' };
  }

  delete(id: string) {
    return `This id is deleted - ${id}`;
  }
}
