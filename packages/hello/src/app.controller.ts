import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(
    public appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return 'Bom dia';
  }
}
