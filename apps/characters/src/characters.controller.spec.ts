import { Test, TestingModule } from '@nestjs/testing';
import { CharactersController } from './characters.controller';
import { CharactersService } from './characters.service';

describe('CharactersController', () => {
  let charactersController: CharactersController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CharactersController],
      providers: [CharactersService],
    }).compile();

    charactersController = app.get<CharactersController>(CharactersController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(charactersController.getHello()).toBe('Hello World!');
    });
  });
});
