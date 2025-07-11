import { Injectable } from '@nestjs/common';
import { CreateSessionSeatDto } from './dto/create-session-seat.dto';
import { UpdateSessionSeatDto } from './dto/update-session-seat.dto';
import { SessionSeatsRepository } from './session-seats-repository';
import { Prisma, SessionSeats } from '@prisma/client';

@Injectable()
export class SessionSeatsService {
  constructor(
    private readonly $sessionSeatsRepository: SessionSeatsRepository,
  ) {}

  async create(data: CreateSessionSeatDto) {
    const { seat_id, session_id } = data;
    const sessionSeatData: Prisma.SessionSeatsCreateInput = {
      seat: {
        connect: {
          id: seat_id,
        },
      },
      session: {
        connect: {
          id: session_id,
        },
      },
    };
    return await this.$sessionSeatsRepository.create(sessionSeatData);
  }

  async findAll(params: Prisma.SessionSeatsFindManyArgs) {
    const [rows, count]: [SessionSeats[], number] = await Promise.all([
      this.$sessionSeatsRepository.findAll(params),
      this.$sessionSeatsRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(id?: number, arg?: Prisma.SessionSeatsFindFirstArgs) {
    const where = arg?.where || { id, deleted_at: null };
    const query = await this.$sessionSeatsRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async update(id: number, data: UpdateSessionSeatDto) {
    const { seat_id, session_id } = data;
    const sessionSeatData: Prisma.SessionSeatsUpdateInput = {
      seat: {
        connect: {
          id: seat_id,
        },
      },
      session: {
        connect: {
          id: session_id,
        },
      },
    };
    return await this.$sessionSeatsRepository.update(id, sessionSeatData);
  }

  async remove(id: number) {
    return await this.$sessionSeatsRepository.remove(id);
  }
}
