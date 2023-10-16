import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class CharactersRepository {
  private readonly logger = new Logger(CharactersRepository.name);
  constructor(private readonly configService: ConfigService) {}

  async getCharacters(token: string): Promise<any> {
    const url = `${this.configService.get('CHARACTER_URL')}`;
    this.logger.log('url', url);
    const headers = CharactersRepository.generateHeaders(token);
    this.logger.log('@headers', headers);
    const result = await axios({ method: 'GET', url: url, headers }).catch(
      (error) => {
        this.logger.error(`RECEIVED_API_CHARACTERS_ERROR_DESC: ${error}`);
        throw new HttpException('get character error', 206);
      },
    );

    this.logger.log('RECEIVED_API_CHARACTERS_OK', result.data);
    return result.data;
  }

  private static generateHeaders(token?: string) {
    return {
      authorization: `Bearer ${token}`,
    };
  }
}
