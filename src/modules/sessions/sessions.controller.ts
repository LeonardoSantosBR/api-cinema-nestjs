import { BadRequestException, Injectable } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Prisma } from '@prisma/client';
import {
  pagination_helper,
  pagination_prisma,
  session_seats_filter,
} from 'src/helpers';
import { querySearchSessions } from './dto/query-search-sessions';

@Injectable()
export class SessionsController {
  constructor(private readonly $sessionsService: SessionsService) {}

  async create(body: CreateSessionDto) {
    const room_already_close = await this.$sessionsService.findOne(undefined, {
      where: {
        room_id: body.room_id,
        starts_at: { lt: new Date(body.ends_at) },
        ends_at: { gt: new Date(body.starts_at) },
      },
    });
    if (room_already_close)
      throw new BadRequestException(
        'Horário da sessão ja está ocupado com outro filme.',
      );
    return this.$sessionsService.create(body);
  }

  async findAll(query: querySearchSessions) {
    const page = +query?.page;
    const limit = +query?.limit;
    const orderBy: Prisma.SessionsOrderByWithAggregationInput =
      query?.order ?? {
        created_at: 'desc',
      };
    const where: Prisma.SessionsWhereInput = {
      is_expired: false,
      deleted_at: null,
    };
    const filter: any = session_seats_filter(query);
    if (filter?.length) where.OR = filter;
    const select: Prisma.SessionsSelect = {
      id: true,
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
          cinema: {
            select: {
              id: true,
              name: true,
              location: true,
            },
          },
        },
      },
    };
    const data = await this.$sessionsService.findAll({
      where,
      orderBy,
      select,
      ...pagination_prisma(limit, page),
    });
    return pagination_helper(page, limit, data.count, data);
  }

  async findOne(id: string) {
    return this.$sessionsService.findOne(+id, {
      select: {
        id: true,
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
            cinema: {
              select: {
                id: true,
                name: true,
                location: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, body: UpdateSessionDto) {
    return this.$sessionsService.update(+id, body);
  }

  async remove(id: string) {
    return this.$sessionsService.remove(+id);
  }
}
