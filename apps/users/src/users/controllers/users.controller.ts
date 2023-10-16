import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
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

  @Post('/auth/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { credentials: { email: string; password: string } },
  ) {
    const { email, password } = body.credentials;
    return this.usersService.validate(email, password);
  }
}
