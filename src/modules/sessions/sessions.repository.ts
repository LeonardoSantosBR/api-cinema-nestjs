import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { Injectable } from '@nestjs/common';
import { PrismaMysqlTransactionService } from 'src/services';

@Injectable()
export class SessionsRepository {
  constructor(
    private readonly $prismaMysql: PrismaServiceMysql,
    private readonly $prismaMysqlTransactionService: PrismaMysqlTransactionService,
  ) {}

  async create(data: Prisma.SessionsCreateInput) {
    await this.$prismaMysql.sessions.create({ data });
    return true;
  }

  async findAll(params: Prisma.SessionsFindManyArgs) {
    const query = await this.$prismaMysql.sessions.findMany(params);
    return query;
  }

  async findOne(params: Prisma.SessionsFindFirstArgs) {
    const query = await this.$prismaMysql.sessions.findFirst(params);
    return query;
  }

  async count(params: Prisma.SessionsCountArgs): Promise<number> {
    const query = await this.$prismaMysql.sessions.count(params);
    return query;
  }

  async update(
    id: number,
    data: Prisma.SessionsUpdateInput,
    arg?: Prisma.SessionsUpdateArgs,
  ) {
    const where = arg?.where || { id };
    const query = await this.$prismaMysql.sessions.update({
      data: {
        ...data,
        updated_at: new Date(),
      },
      where,
      ...arg,
    });
    return query;
  }

  async updateSessionsExpired(ids: Array<number>) {
    const transaction = async (tr: PrismaServiceMysql) => {
      await tr.sessions.updateMany({
        where: { id: { in: ids } },
        data: { is_expired: true },
      });
      await tr.sessionSeats.updateMany({
        where: {
          id: { in: ids },
        },
        data: { deleted_at: new Date() },
      });
    };
    await this.$prismaMysqlTransactionService.transaction(transaction, {
      timeout: 50000,
    });
  }

  async remove(id: number) {
    await this.$prismaMysql.sessions.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return true;
  }
}
