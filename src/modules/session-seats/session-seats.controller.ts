import { BadRequestException, Injectable } from '@nestjs/common';
import { SessionSeatsService } from './session-seats.service';
import { CreateSessionSeatDto } from './dto/create-session-seat.dto';
import { UpdateSessionSeatDto } from './dto/update-session-seat.dto';
import { Prisma } from '@prisma/client';
import {
  pagination_helper,
  pagination_prisma,
  sessionSeatsFilter,
} from 'src/helpers';
import { querySearchSessionSeats } from './dto/query-search-session-seats';

@Injectable()
export class SessionSeatsController {
  constructor(private readonly $sessionSeatsService: SessionSeatsService) {}

  async create(body: CreateSessionSeatDto) {
    const seat_already_close = await this.$sessionSeatsService.findOne(
      undefined,
      {
        where: {
          session_id: body.session_id,
          seat_id: body.seat_id,
          deleted_at: null,
        },
      },
    );

    if (seat_already_close)
      throw new BadRequestException('Assento para essa sessão já está ocupado');
    return this.$sessionSeatsService.create(body);
  }

  async findAll(query: querySearchSessionSeats) {
    const page = +query?.page;
    const limit = +query?.limit;
    const orderBy: Prisma.SessionSeatsOrderByWithAggregationInput =
      query?.order ?? {
        created_at: 'desc',
      };
    const where: Prisma.SessionSeatsWhereInput = {
      deleted_at: null,
    };
    const filter: any = sessionSeatsFilter(query);
    if (filter?.length) where.OR = filter;
    const select: Prisma.SessionSeatsSelect = {};

    const data = await this.$sessionSeatsService.findAll({
      where,
      orderBy,
      select,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async findOne(id: string) {
    return this.$sessionSeatsService.findOne(+id);
  }

  async update(id: string, body: UpdateSessionSeatDto) {
    return this.$sessionSeatsService.update(+id, body);
  }

  async remove(id: string) {
    return this.$sessionSeatsService.remove(+id);
  }
}
