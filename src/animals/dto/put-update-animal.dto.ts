import { ApiProperty } from '@nestjs/swagger';

export class PutUpdadeAnimal {
  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  age: number;
}
