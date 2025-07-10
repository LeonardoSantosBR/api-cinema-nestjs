import { BadRequestException, Injectable } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { querySearchMovies } from '../cinemas/dto/query-search-movies';
import { Prisma } from '@prisma/client';
import {
  moviesFilter,
  pagination_helper,
  pagination_prisma,
} from 'src/helpers';

@Injectable()
export class MoviesController {
  constructor(private readonly $moviesService: MoviesService) {}

  async create(body: CreateMovieDto) {
    const movie = await this.findOneByName(body.name);
    if (movie) throw new BadRequestException('Filme com esse nome já existe.');
    return this.$moviesService.create(body);
  }

  async findAll(query: querySearchMovies) {
    const page = +query?.page;
    const limit = +query?.limit;
    const orderBy: Prisma.MoviesOrderByWithAggregationInput = query?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.MoviesWhereInput = {
      deleted_at: null,
    };
    const filter: any = moviesFilter(query);
    if (filter?.length) where.OR = filter;
    const include: Prisma.MoviesInclude = {};

    const data = await this.$moviesService.findAll({
      where,
      orderBy,
      include,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async findOne(id: string) {
    return this.$moviesService.findOne(+id);
  }

  async findOneByName(name: string) {
    return this.$moviesService.findOneByName(name);
  }

  async update(id: string, body: UpdateMovieDto) {
    return await this.$moviesService.update(+id, body);
  }

  async remove(id: string) {
    return this.$moviesService.remove(+id);
  }
}
