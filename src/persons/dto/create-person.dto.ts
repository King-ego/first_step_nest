import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
  @ApiProperty()
  'firstName': string;

  @ApiProperty()
  'lastName': string;

  @ApiProperty()
  'description': string;

  @ApiProperty()
  'nation': string;

  @ApiProperty()
  'isActive': boolean;
}
