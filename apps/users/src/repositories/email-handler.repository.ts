import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import RequestEmailDto from '../users/dto/request-email.dto';

@Injectable()
export class EmailHandlerRepository {
  private logger = new Logger(EmailHandlerRepository.name);
  constructor(private readonly configService: ConfigService) {}

  async dispatch(body: RequestEmailDto) {
    const url = `${this.configService.get('EMAIL_SERVICE_API_URI')}`;
    this.logger.log('url', url);

    const result = await axios.post(url, body).catch((error) => {
      this.logger.error(`SEND_EMAIL_ERROR: ${error}`);
      throw new HttpException('error sending email', 206);
    });
    this.logger.log('SEND_EMAIL_REGISTER_OK', result.data);
  }
}
