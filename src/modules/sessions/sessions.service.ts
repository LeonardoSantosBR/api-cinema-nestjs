import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Sessions, Prisma } from '@prisma/client';
import { SessionsRepository } from './sessions.repository';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SessionsService {
  constructor(private readonly $sessionsRepository: SessionsRepository) {}

  async create(data: CreateSessionDto) {
    const { starts_at, ends_at, room_id, movie_id } = data;
    const sessionData: Prisma.SessionsCreateInput = {
      movie: {
        connect: {
          id: movie_id,
        },
      },
      room: {
        connect: {
          id: room_id,
        },
      },
      starts_at: new Date(starts_at),
      ends_at: new Date(ends_at),
    };
    return await this.$sessionsRepository.create(sessionData);
  }

  async findAll(params: Prisma.SessionsFindManyArgs) {
    const [rows, count]: [Sessions[], number] = await Promise.all([
      this.$sessionsRepository.findAll(params),
      this.$sessionsRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(id?: number, arg?: Prisma.SessionsFindFirstArgs) {
    const where = arg?.where || { id, deleted_at: null };
    const query = await this.$sessionsRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async update(id: number, data: UpdateSessionDto) {
    return await this.$sessionsRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.$sessionsRepository.remove(id);
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCronSessionExpired() {
    const today = new Date();
    const sessions_expired = await this.$sessionsRepository.findAll({
      where: {
        ends_at: {
          lte: today,
        },
        is_expired: false,
      },
      select: { id: true },
    });
    const ids = sessions_expired?.map((se) => {
      return se.id;
    });
    await this.$sessionsRepository.updateSessionsExpired(ids);
  }
}
