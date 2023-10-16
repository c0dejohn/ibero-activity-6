import { HttpException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class UsersRepository {
  private readonly logger = new Logger(UsersRepository.name);
  constructor(private readonly configService: ConfigService) {}

  async getUsers(email: string, token?: string): Promise<any> {
    const url = `${this.configService.get('USER_URL')}/${email}`;
    this.logger.log('url', url);
    const headers = UsersRepository.generateHeaders(email, token);

    const result = await axios({ method: 'GET', url: url, headers }).catch(
      (error) => {
        this.logger.error(`RECEIVED_API_USER_ERROR_DESC: ${error}`);
        throw new HttpException('get user error', 206);
      },
    );

    this.logger.log('RECEIVED_API_USER_OK', result.data);
    return result.data;
  }
  async validate(credentials): Promise<any> {
    const url = `${this.configService.get('USER_URL')}/auth/login`;
    this.logger.log('url', url);
    const headers = UsersRepository.generateHeaders(credentials.email, null);
    const body = {
      credentials,
    };
    this.logger.log('RECEIVED_API_USER_LOGIN_BODY', body);
    const result = await axios.post(url, body, { headers }).catch((error) => {
      this.logger.error(`RECEIVED_API_USER_LOGIN_ERROR_DESC: ${error}`);
      throw new HttpException('get user error', 206);
    });

    this.logger.log('RECEIVED_API_USER_LOGIN_OK', result.data);
    return result.data;
  }
  async create(email: string, password: string): Promise<any> {
    const url = `${this.configService.get('USER_URL')}`;
    this.logger.log('url', url);
    const headers = UsersRepository.generateHeaders(email, null);
    const body = {
      email,
      password,
    };
    return await axios
      .post(url, body, { headers })
      .catch((error) => {
        this.logger.error(`RECEIVED_API_USER_REGISTER_ERROR_DESC: ${error}`);
        throw new HttpException(
          'An error occurred while creating the user',
          400,
        );
      })
      .then(() => {
        this.logger.log('RECEIVED_API_USER_REGISTER_OK');
        return { msg: 'User created' };
      });
  }

  private static generateHeaders(email: string, token?: string) {
    return {
      'X-Invoker-User': email,
      authorization: token,
    };
  }
}
