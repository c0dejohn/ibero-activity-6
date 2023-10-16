import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../services/app.service';

@Controller('composer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('user/:email')
  findUser(@Param('email') email: string) {
    return this.appService.getUsers(email);
  }
}
