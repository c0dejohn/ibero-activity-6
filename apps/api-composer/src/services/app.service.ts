import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';

@Injectable()
export class AppService {
  constructor(private readonly userRepository: UsersRepository) {}
  async getUsers(email) {
    return this.userRepository.getUsers(email);
  }

  async register(body: { email: string; password: string }) {
    const { email, password } = body;
    await this.userRepository.create(email, password);
  }

  async login(credentials) {
    return this.userRepository.validate(credentials);
  }
}
