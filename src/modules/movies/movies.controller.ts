import { BadRequestException, Injectable } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

import { Prisma } from '@prisma/client';
import {
  movies_filter,
  pagination_helper,
  pagination_prisma,
} from 'src/helpers';
import { querySearchMovies } from './dto/query-search-movies';

@Injectable()
export class MoviesController {
  constructor(private readonly $moviesService: MoviesService) {}

  async create(body: CreateMovieDto) {
    const movie = await this.findOneByName(body.name);
    if (movie) throw new BadRequestException('Filme com esse nome já existe.');
    return this.$moviesService.create(body);
  }

  async findAll(querys: querySearchMovies) {
    const page = +querys?.page;
    const limit = +querys?.limit;
    const orderBy: Prisma.MoviesOrderByWithAggregationInput = querys?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.MoviesWhereInput = {
      deleted_at: null,
    };
    const filter: any = movies_filter(querys);
    if (filter?.length) where.OR = filter;
    const include: Prisma.MoviesInclude = {
      sessions: {
        select: {
          starts_at: true,
          ends_at: true,
          movie: {
            select: {
              id: true,
              name: true,
            },
          },
          room: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    };

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
