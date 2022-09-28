import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { api: string } {
    return { api: 'ok' };
  }
}
