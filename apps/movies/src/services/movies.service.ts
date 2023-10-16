import { Injectable } from '@nestjs/common';
import { MoviesRepository } from '../repositories/movies.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly repository: MoviesRepository) {}
  async getMovies() {
    return this.repository.getAll();
  }
}
