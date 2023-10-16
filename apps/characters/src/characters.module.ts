import { Module } from '@nestjs/common';
import { CharactersController } from './controller/characters.controller';
import { CharactersService } from './services/characters.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Character, CharacterSchema } from './schemas/character.schema';
import { CharactersRepository } from './repositories/characters.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'characters',
        autoIndex: true,
      }),
      connectionName: 'characters',
    }),
    MongooseModule.forFeature(
      [{ name: Character.name, schema: CharacterSchema }],
      'characters',
    ),
  ],
  controllers: [CharactersController],
  providers: [CharactersService, CharactersRepository],
})
export class CharactersModule {}
