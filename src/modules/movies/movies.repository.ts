import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MoviesRepository {
  constructor(private readonly $prismaMysql: PrismaServiceMysql) {}

  async create(data: Prisma.MoviesCreateInput) {
    await this.$prismaMysql.movies.create({ data });
    return true;
  }

  async findAll(params: Prisma.MoviesFindManyArgs) {
    const query = await this.$prismaMysql.movies.findMany(params);
    return query;
  }

  async findOne(params: Prisma.MoviesFindFirstArgs) {
    const query = await this.$prismaMysql.movies.findFirst(params);
    return query;
  }

  async count(params: Prisma.MoviesCountArgs): Promise<number> {
    const query = await this.$prismaMysql.movies.count(params);
    return query;
  }

  async update(
    id: number,
    data: Prisma.MoviesUpdateInput,
    arg?: Prisma.MoviesUpdateArgs,
  ) {
    const where = arg?.where || { id };
    const query = await this.$prismaMysql.movies.update({
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
    await this.$prismaMysql.movies.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return true;
  }
}
