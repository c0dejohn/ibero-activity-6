import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:email')
  getUser(@Param('email') email: string) {
    return this.usersService.getUser(email);
  }

  @Post()
  createUser(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    return this.usersService.createUser(email, password);
  }
}
