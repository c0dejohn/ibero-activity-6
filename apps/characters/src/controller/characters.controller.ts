import { Controller, Get } from '@nestjs/common';
import { CharactersService } from '../services/characters.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  async getAll() {
    return this.charactersService.getCharacters();
  }
}
