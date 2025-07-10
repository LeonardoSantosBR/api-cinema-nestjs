import { Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateCinemaDto } from '../cinemas/dto/update-cinema.dto';
import { Movies, Prisma } from '@prisma/client';
import { MoviesRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(private readonly $moviesRepository: MoviesRepository) {}

  async create(data: CreateMovieDto) {
    return await this.$moviesRepository.create(data);
  }

  async findAll(params: Prisma.MoviesFindManyArgs) {
    const [rows, count]: [Movies[], number] = await Promise.all([
      this.$moviesRepository.findAll(params),
      this.$moviesRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(id: number, arg?: Prisma.MoviesFindFirstArgs) {
    const where = arg?.where || { id, deleted_at: null };
    const query = await this.$moviesRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async findOneByName(name: string, arg?: Prisma.MoviesFindFirstArgs) {
    const where = arg?.where || { name, deleted_at: null };
    const query = await this.$moviesRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async update(id: number, data: UpdateCinemaDto) {
    return await this.$moviesRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.$moviesRepository.remove(id);
  }
}
