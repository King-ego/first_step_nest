import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { PersonsModule } from './persons/persons.module';

@Module({
  imports: [DatabaseModule, PersonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
