import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PersonsService } from './persons.service';
import { PersonsController } from './persons.controller';
import { DatabaseModule } from 'src/database/database.module';

import { Person } from './entities/person.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Person])],
  controllers: [PersonsController],
  providers: [PersonsService],
})
export class PersonsModule {}
