import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdensModule } from './ordens/ordens.module';

@Module({
  imports: [OrdensModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
