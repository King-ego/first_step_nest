import { ApiProperty } from '@nestjs/swagger';
import { Person } from 'src/persons/entities/person.entity';

export class CreateAnimalDto {
  @ApiProperty()
  'name': string;

  @ApiProperty()
  'type': string;

  @ApiProperty()
  'age': number;

  @ApiProperty()
  'person': Person;
}
