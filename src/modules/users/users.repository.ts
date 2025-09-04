import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(private readonly $prismaMysql: PrismaServiceMysql) {}

  async create(data: Prisma.UsersCreateInput) {
    await this.$prismaMysql.users.create({ data });
    return true;
  }

  async findAll(params: Prisma.UsersFindManyArgs) {
    const query = await this.$prismaMysql.users.findMany(params);
    return query;
  }

  async findMyTickets(id: number) {
    const query = await this.$prismaMysql.$queryRaw`
                  SELECT 
                      ss_seats.id,
                      ss_seats.session_id,
                      mv.name,
                      rms.name AS room_name,
                  FROM session_seats ss_seats
                  JOIN sessions sess ON ss_seats.session_id = sess.id
                  JOIN movies mv ON sess.movie_id = mv.id
                  JOIN rooms rms ON sess.room_id = rms.id
                  JOIN seats sts ON ss_seats.seat_id = sts.id
                  WHERE ss_seats.user_id = ${id} AND ss_seats.deleted_at IS NULL 
                  `;
    return query;
  }

  async findOne(params: Prisma.UsersFindFirstArgs) {
    const query = await this.$prismaMysql.users.findFirst(params);
    return query;
  }

  async count(params: Prisma.UsersCountArgs): Promise<number> {
    const query = await this.$prismaMysql.users.count(params);
    return query;
  }

  async update(
    id: number,
    data: Prisma.UsersUpdateInput,
    arg?: Prisma.UsersUpdateArgs,
  ) {
    const where = arg?.where || { id };
    const query = await this.$prismaMysql.users.update({
      data: {
        ...data,
        updated_at: new Date(),
      },
      where,
      ...arg,
    });
    return query;
  }

  async remove(id: number) {
    await this.$prismaMysql.users.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return true;
  }
}
