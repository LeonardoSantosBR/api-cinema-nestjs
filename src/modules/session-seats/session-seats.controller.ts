import { BadRequestException, Injectable } from '@nestjs/common';
import { SessionSeatsService } from './session-seats.service';
import { CreateSessionSeatDto } from './dto/create-session-seat.dto';
import { Prisma } from '@prisma/client';
import {
  pagination_helper,
  pagination_prisma,
  session_seats_filter,
} from 'src/helpers';
import { querySearchSessionSeats } from './dto/query-search-session-seats';
import { IuserToken } from 'src/types';

@Injectable()
export class SessionSeatsController {
  constructor(private readonly $sessionSeatsService: SessionSeatsService) {}

  async create(body: CreateSessionSeatDto, user: IuserToken) {
    const seat_already_close = await this.$sessionSeatsService.findAll({
      where: {
        session_id: body.session_id,
        seat_id: {
          in: body.seats_id,
        },
        deleted_at: null,
      },
    });
    if (seat_already_close.rows.length > 0)
      throw new BadRequestException(
        'Assentos para essa sessão já está ocupado.',
      );
    return this.$sessionSeatsService.create(body, user);
  }

  async findAll(querys: querySearchSessionSeats) {
    const page = +querys?.page;
    const limit = +querys?.limit;
    const orderBy: Prisma.SessionSeatsOrderByWithAggregationInput =
      querys?.order ?? {
        created_at: 'desc',
      };
    const where: Prisma.SessionSeatsWhereInput = {
      deleted_at: null,
    };
    const filter: any = session_seats_filter(querys);
    if (filter?.length) where.OR = filter;
    const select: Prisma.SessionSeatsSelect = {
      session: {
        select: {
          room: {
            select: {
              id: true,
              name: true,
            },
          },
          movie: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    };

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

  async remove(id: string) {
    return this.$sessionSeatsService.remove(+id);
  }
}
