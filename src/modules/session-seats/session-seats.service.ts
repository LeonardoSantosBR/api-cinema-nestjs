import { Injectable } from '@nestjs/common';
import { CreateSessionSeatDto } from './dto/create-session-seat.dto';
import { SessionSeatsRepository } from './session-seats-repository';
import { Prisma, SessionSeats } from '@prisma/client';
import { UserToken } from 'src/types';

@Injectable()
export class SessionSeatsService {
  constructor(
    private readonly $sessionSeatsRepository: SessionSeatsRepository,
  ) {}

  async create(data: CreateSessionSeatDto, user: UserToken) {
    const { seats_id, session_id } = data;
    const seassion_seat_data_array: Prisma.SessionSeatsCreateManyInput[] = [];
    for (const seat_id of seats_id) {
      seassion_seat_data_array.push({
        seat_id,
        session_id,
        user_id: user.id,
      });
    }
    return await this.$sessionSeatsRepository.createMany(
      seassion_seat_data_array,
    );
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

  async remove(id: number) {
    return await this.$sessionSeatsRepository.remove(id);
  }
}
