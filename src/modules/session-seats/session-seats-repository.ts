import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SessionSeatsRepository {
  constructor(private readonly $prismaMysql: PrismaServiceMysql) {}

  async create(data: Prisma.SessionSeatsCreateInput) {
    await this.$prismaMysql.sessionSeats.create({ data });
    return true;
  }

  async findAll(params: Prisma.SessionSeatsFindManyArgs) {
    const query = await this.$prismaMysql.sessionSeats.findMany(params);
    return query;
  }

  async findOne(params: Prisma.SessionSeatsFindFirstArgs) {
    const query = await this.$prismaMysql.sessionSeats.findFirst(params);
    return query;
  }

  async count(params: Prisma.SessionSeatsCountArgs): Promise<number> {
    const query = await this.$prismaMysql.sessionSeats.count(params);
    return query;
  }

  async update(
    id: number,
    data: Prisma.SessionSeatsUpdateInput,
    arg?: Prisma.SessionSeatsUpdateArgs,
  ) {
    const where = arg?.where || { id };
    const query = await this.$prismaMysql.sessionSeats.update({
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
    await this.$prismaMysql.sessionSeats.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return true;
  }
}
