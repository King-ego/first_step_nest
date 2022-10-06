import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PersonsModule } from './persons/persons.module';
import { AnimalsModule } from './animals/animals.module';

@Module({
  imports: [DatabaseModule, PersonsModule, AnimalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
