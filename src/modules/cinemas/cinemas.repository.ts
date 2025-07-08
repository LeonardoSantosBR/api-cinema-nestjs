import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CinemasRepository {
  constructor(private readonly $prismaMysql: PrismaServiceMysql) {}

  async create(data: Prisma.CinemasCreateInput) {
    await this.$prismaMysql.cinemas.create({ data });
    return true;
  }

  async findAll(params: Prisma.CinemasFindManyArgs) {
    const query = await this.$prismaMysql.cinemas.findMany(params);
    return query;
  }

  async findOne(params: Prisma.CinemasFindFirstArgs) {
    const query = await this.$prismaMysql.cinemas.findFirst(params);
    return query;
  }

  async count(params: Prisma.CinemasCountArgs): Promise<number> {
    const query = await this.$prismaMysql.cinemas.count(params);
    return query;
  }

  async update(
    id: number,
    data: Prisma.CinemasUpdateInput,
    arg?: Prisma.CinemasUpdateArgs,
  ) {
    const where = arg?.where || { id };
    const query = await this.$prismaMysql.cinemas.update({
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
    await this.$prismaMysql.cinemas.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return true;
  }
}
