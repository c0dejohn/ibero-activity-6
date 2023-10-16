import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repositories/user.repository';
import { EncryptorService } from '../../../utils/encryptor.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encryptor: EncryptorService,
  ) {}

  async getUser(email: string): Promise<any> {
    return this.userRepository.findByEmail(email);
  }

  async createUser(email, password) {
    const encryptedPass = this.encryptor.encryptBody(password);
    return this.userRepository.create(email, encryptedPass);
  }
}
