import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CredentialsDto } from '../dto/credentials.dto';

@ApiTags('composer')
@Controller('composer')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('user')
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiBody({
    type: CredentialsDto,
  })
  async createUser(@Body() body: CredentialsDto) {
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

  //@UseGuards(AuthGuard('jwt'))
  @Get('characters')
  @ApiResponse({
    headers: {},
    status: HttpStatus.OK,
  })
  @ApiHeader({
    name: 'authorization',
  })
  find(@Req() req: any) {
    const accessToken = req.headers.authorization;
    const token = accessToken?.slice(7);
    return this.appService.getAll(token);
  }

  @Get('movies')
  @ApiResponse({
    headers: {},
    status: HttpStatus.OK,
  })
  @ApiHeader({
    name: 'authorization',
  })
  findMovies(@Req() req: any) {
    const accessToken = req.headers.authorization;
    const token = accessToken?.slice(7);
    return this.appService.getMovies(token);
  }
}
