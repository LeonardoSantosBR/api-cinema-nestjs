import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsRepository {
  constructor(private readonly $prismaMysql: PrismaServiceMysql) {}

  async create(data: Prisma.RoomsCreateInput) {
    await this.$prismaMysql.rooms.create({ data });
    return true;
  }

  async findAll(params: Prisma.RoomsFindManyArgs) {
    const query = await this.$prismaMysql.rooms.findMany(params);
    return query;
  }

  async findOne(params: Prisma.RoomsFindFirstArgs) {
    const query = await this.$prismaMysql.rooms.findFirst(params);
    return query;
  }

  async count(params: Prisma.RoomsCountArgs): Promise<number> {
    const query = await this.$prismaMysql.rooms.count(params);
    return query;
  }

  async update(
    id: number,
    data: Prisma.RoomsUpdateInput,
    arg?: Prisma.RoomsUpdateArgs,
  ) {
    const where = arg?.where || { id };
    const query = await this.$prismaMysql.rooms.update({
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
    await this.$prismaMysql.rooms.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return true;
  }
}
