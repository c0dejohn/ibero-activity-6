import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from '../schemas/movies.schema';

@Injectable()
export class MoviesRepository {
  private logger = new Logger(MoviesRepository.name);

  constructor(
    @InjectModel(Movie.name, 'movies')
    @InjectConnection('movies')
    private readonly MoviesModel: Model<MovieDocument>,
  ) {}

  async getAll(): Promise<Movie> {
    const getMovie = await this.MoviesModel.find({}).lean().exec();

    if (getMovie === null) throw new HttpException('Movies not found', 206);

    this.logger.log('@response', getMovie);
    return getMovie as any;
  }
}
