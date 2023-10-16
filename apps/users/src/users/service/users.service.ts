import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(email: string): Promise<any> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(email, password) {
    return this.userRepository.create(email, password);
  }

  async validate(email, password) {
    return this.userRepository.validateUser(email, password);
  }
}
