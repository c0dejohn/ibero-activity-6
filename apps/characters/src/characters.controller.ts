import { Controller, Get } from '@nestjs/common';
import { CharactersService } from './characters.service';

@Controller()
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  getHello(): string {
    return this.charactersService.getHello();
  }
}
