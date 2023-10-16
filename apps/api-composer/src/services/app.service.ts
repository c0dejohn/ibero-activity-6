import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repositories/user.repository';
import { CharactersRepository } from '../repositories/characters.repository';
import { RecordsRepository } from '../repositories/movies.repository';

@Injectable()
export class AppService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly charactersRepository: CharactersRepository,
    private readonly moviesRepository: RecordsRepository,
  ) {}
  async getUsers(email, token) {
    return this.userRepository.getUsers(email, token);
  }

  async register(body: { email: string; password: string }) {
    const { email, password } = body;
    return this.userRepository.create(email, password);
  }

  async login(credentials) {
    return this.userRepository.validate(credentials);
  }

  async getAll(token?: string) {
    return this.charactersRepository.getCharacters(token);
  }
  async getMovies(token?: string) {
    return this.moviesRepository.getRecords(token);
  }
}
