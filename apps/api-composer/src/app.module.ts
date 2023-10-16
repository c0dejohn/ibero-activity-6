import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { UsersRepository } from './repositories/user.repository';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './authentication/authentication.module';
import { CharactersRepository } from './repositories/characters.repository';
import { RecordsRepository } from './repositories/movies.repository';

@Module({
  imports: [ConfigModule.forRoot(), AuthenticationModule],
  controllers: [AppController],
  providers: [
    AppService,
    UsersRepository,
    CharactersRepository,
    RecordsRepository,
  ],
})
export class AppModule {}
