import { BadRequestException, Injectable } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Prisma } from '@prisma/client';
import { pagination_helper, pagination_prisma } from 'src/helpers';
import { rooms_filter } from 'src/helpers/filters/rooms-filter';
import { querySearchRooms } from './dto/query-search-rooms';

@Injectable()
export class RoomsController {
  constructor(private readonly $roomsService: RoomsService) {}

  async create(body: CreateRoomDto) {
    const room_already_exists = await this.$roomsService.findOne(undefined, {
      where: { cinema_id: body.cinema_id, name: body.name },
    });
    if (room_already_exists)
      throw new BadRequestException(
        'Este cinema ja possui uma sala com este nome.',
      );
    return this.$roomsService.create(body);
  }

  async findAll(querys: querySearchRooms) {
    const page = +querys?.page;
    const limit = +querys?.limit;
    const orderBy: Prisma.RoomsOrderByWithAggregationInput = querys?.order ?? {
      created_at: 'desc',
    };
    const where: Prisma.RoomsWhereInput = {
      deleted_at: null,
    };
    const filter: any = rooms_filter(querys);
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
