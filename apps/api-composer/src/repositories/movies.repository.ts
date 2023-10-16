import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class RecordsRepository {
  private readonly logger = new Logger(RecordsRepository.name);
  constructor(private readonly configService: ConfigService) {}

  async getRecords(token: string): Promise<any> {
    const url = `${this.configService.get('MOVIES_URL')}`;
    this.logger.log('url', url);
    const headers = RecordsRepository.generateHeaders(token);
    this.logger.log('@headers', headers);
    const result = await axios({ method: 'GET', url: url, headers }).catch(
      (error) => {
        this.logger.error(`RECEIVED_API_MOVIES_ERROR_DESC: ${error}`);
        throw new HttpException('get movie error', 206);
      },
    );

    this.logger.log('RECEIVED_API_MOVIES_OK', result.data);
    return result.data;
  }

  private static generateHeaders(token?: string) {
    return {
      authorization: `Bearer ${token}`,
    };
  }
}
