import { Injectable } from '@nestjs/common';
import { CharactersRepository } from '../repositories/characters.repository';

@Injectable()
export class CharactersService {
  constructor(private readonly repository: CharactersRepository) {}

  async getCharacters() {
    return this.repository.getAll();
  }
}
