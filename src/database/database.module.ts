import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/persons/entities/person.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.development.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Person],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
