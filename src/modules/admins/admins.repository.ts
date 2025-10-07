import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminsRepository {
  constructor(private readonly $prismaMysql: PrismaServiceMysql) {}

  async create(data: Prisma.AdminsCreateInput) {
    await this.$prismaMysql.admins.create({ data });
    return true;
  }

  async findAll(params: Prisma.AdminsFindManyArgs) {
    const query = await this.$prismaMysql.admins.findMany(params);
    return query;
  }

  async findOne(params: Prisma.AdminsFindFirstArgs) {
    const query = await this.$prismaMysql.admins.findFirst(params);
    return query;
  }

  async count(params: Prisma.AdminsCountArgs): Promise<number> {
    const query = await this.$prismaMysql.admins.count(params);
    return query;
  }

  async update(
    id: number,
    data: Prisma.AdminsUpdateInput,
    arg?: Prisma.AdminsUpdateArgs,
  ) {
    const where = arg?.where || { id };
    const query = await this.$prismaMysql.admins.update({
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
    await this.$prismaMysql.admins.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return true;
  }
}
