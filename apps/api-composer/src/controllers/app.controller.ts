import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from '../dto/credentials.dto';

@ApiTags('composer')
@Controller('composer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //@UseGuards(AuthGuard('jwt'))
  @Get('user/:email')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiHeader({
    name: 'access_token',
  })
  findUser(@Param('email') email: string) {
    return this.appService.getUsers(email);
  }

  @Post('user')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async createUser(@Body() body) {
    return this.appService.register(body);
  }

  @Post('user/auth/login')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBody({
    type: CredentialsDto,
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: CredentialsDto) {
    return this.appService.login(credentials);
  }
}
