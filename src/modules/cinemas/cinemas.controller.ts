import { BadRequestException, Injectable } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { querySearchCinemas } from './dto/query-search-cinema';
import { Prisma } from '@prisma/client';
import {
  cinemasFilter,
  pagination_helper,
  pagination_prisma,
} from 'src/helpers';

@Injectable()
export class CinemasController {
  constructor(private readonly $cinemasService: CinemasService) {}

  async create(body: CreateCinemaDto) {
    const cinema = await this.findOneByName(body.name);
    if (cinema)
      throw new BadRequestException('Cinema com esse nome já existe.');
    return this.$cinemasService.create(body);
  }

  async findAll(query: querySearchCinemas) {
    const page = +query?.page;
    const limit = +query?.limit;
    const orderBy: Prisma.CinemasOrderByWithAggregationInput = query?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.CinemasWhereInput = {
      deleted_at: null,
    };
    const filter: any = cinemasFilter(query);
    if (filter?.length) where.OR = filter;
    const include: Prisma.CinemasInclude = {
      rooms: {
        select: {
          id: true,
          name: true,
        },
      },
    };

    const data = await this.$cinemasService.findAll({
      where,
      orderBy,
      include,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async findOne(id: string) {
    return await this.$cinemasService.findOne(+id, {
      include: { rooms: { select: { id: true, name: true } } },
    });
  }

  async findOneByName(name: string) {
    return await this.$cinemasService.findOneByName(name);
  }
  async update(id: string, body: UpdateCinemaDto) {
    return this.$cinemasService.update(+id, body);
  }

  async remove(id: string) {
    return this.$cinemasService.remove(+id);
  }
}
