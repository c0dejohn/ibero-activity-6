import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UsersRepository) {}
  async getUsers(email) {
    return this.userRepository.getUsers(email);
  }
}
