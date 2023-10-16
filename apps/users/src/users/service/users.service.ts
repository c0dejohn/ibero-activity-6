import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { EmailHanlderService } from './email.hanlder.service';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly emailHandler: EmailHanlderService,
  ) {}

  async getUser(email: string): Promise<any> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(email, password) {
    return this.userRepository.create(email, password).then(() => {
      this.logger.log('Sending welcome email...');
      this.emailHandler.dispatch(email);
    });
  }

  async validate(email, password) {
    return this.userRepository.validateUser(email, password);
  }
}
