import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';

@Controller('api/test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags('Application')
  getHello(): { api: string } {
    return this.appService.getHello();
  }
}
