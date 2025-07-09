import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';

@Injectable()
export class PrismaMysqlTransactionService {
  constructor(private readonly prismaMysql: PrismaServiceMysql) {}
  async transaction(
    callback: (tr: Prisma.TransactionClient) => Promise<any>,
    config?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    },
  ): Promise<any> {
    return await this.prismaMysql.$transaction(callback, config);
  }
}
