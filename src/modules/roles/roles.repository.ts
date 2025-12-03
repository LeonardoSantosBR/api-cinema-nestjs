import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RolesRepository {
  constructor(private readonly $prismaMysql: PrismaServiceMysql) {}

  async create(data: Prisma.RolesCreateInput) {
    await this.$prismaMysql.roles.create({ data });
    return true;
  }

  async findAll(params: Prisma.RolesFindManyArgs) {
    const query = await this.$prismaMysql.roles.findMany(params);
    return query;
  }

  async findOne(params: Prisma.RolesFindFirstArgs) {
    const query = await this.$prismaMysql.roles.findFirst(params);
    return query;
  }

  async count(params: Prisma.RolesCountArgs): Promise<number> {
    const query = await this.$prismaMysql.roles.count(params);
    return query;
  }

  async update(
    id: number,
    data: Prisma.RolesUpdateInput,
    arg?: Prisma.RolesUpdateArgs,
  ) {
    const where = arg?.where || { id };
    const query = await this.$prismaMysql.roles.update({
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
    await this.$prismaMysql.roles.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return true;
  }
}
