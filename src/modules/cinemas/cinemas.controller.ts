import { BadRequestException, Injectable } from '@nestjs/common';
import { CinemasService } from './cinemas.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { querySearchCinemas } from './dto/query-search-cinema';
import { Prisma } from '@prisma/client';
import {
  cinemas_filter,
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

  async findAll(querys: querySearchCinemas) {
    const page = +querys?.page;
    const limit = +querys?.limit;
    const orderBy: Prisma.CinemasOrderByWithAggregationInput = querys?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.CinemasWhereInput = {
      deleted_at: null,
    };
    const filter: any = cinemas_filter(querys);
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
