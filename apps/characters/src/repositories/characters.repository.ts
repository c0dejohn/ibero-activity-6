import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CharactersDto } from '../dto/characters.dto';
import { Character, CharacterDocument } from '../schemas/character.schema';

@Injectable()
export class CharactersRepository {
  private logger = new Logger(CharactersRepository.name);

  constructor(
    @InjectModel(Character.name, 'characters')
    @InjectConnection('characters')
    private readonly CharactersModel: Model<CharacterDocument>,
  ) {}

  async getAll(): Promise<Character> {
    const getCharacter = await this.CharactersModel.find({}).lean().exec();

    if (getCharacter === null)
      throw new HttpException('Character not found', 206);

    this.logger.log('@response', getCharacter);
    return getCharacter as any;
  }

  async create(body: CharactersDto): Promise<void> {
    await this.CharactersModel.create(body)
      .catch((err) => {
        this.logger.error(err);
        throw new HttpException('Character already exist', 400);
      })
      .then(() => {
        return { msg: 'Character created successfully' };
      });
  }
}
