import { Module } from '@nestjs/common';
import { MoviesController } from './controller/movies.controller';
import { MoviesService } from './services/movies.service';
import { MoviesRepository } from './repositories/movies.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie, MovieSchema } from './schemas/movies.schema';

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
        dbName: 'movies',
        autoIndex: true,
      }),
      connectionName: 'movies',
    }),
    MongooseModule.forFeature(
      [{ name: Movie.name, schema: MovieSchema }],
      'movies',
    ),
  ],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
