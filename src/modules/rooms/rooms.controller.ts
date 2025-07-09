import { Injectable } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Prisma } from '@prisma/client';
import { pagination_helper, pagination_prisma } from 'src/helpers';
import { roomsFilter } from 'src/helpers/filters/rooms-filter';
import { querySearchRooms } from './dto/query-search-rooms';

@Injectable()
export class RoomsController {
  constructor(private readonly $roomsService: RoomsService) {}

  async create(body: CreateRoomDto) {
    return this.$roomsService.create(body);
  }

  async findAll(query: querySearchRooms) {
    const page = +query?.page;
    const limit = +query?.limit;
    const orderBy: Prisma.RoomsOrderByWithAggregationInput = query?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.RoomsWhereInput = {
      deleted_at: null,
    };
    const filter: any = roomsFilter(query);
    if (filter?.length) where.OR = filter;
    const include: Prisma.RoomsInclude = {
      cinema: {
        select: {
          id: true,
          name: true,
          location: true,
        },
      },
    };

    const data = await this.$roomsService.findAll({
      where,
      orderBy,
      include,
      ...pagination_prisma(limit, page),
    });

    return pagination_helper(page, limit, data.count, data);
  }

  async findOne(id: string) {
    return this.$roomsService.findOne(+id);
  }

  async update(id: string, body: UpdateRoomDto) {
    return this.$roomsService.update(+id, body);
  }

  async remove(id: string) {
    return this.$roomsService.remove(+id);
  }
}
