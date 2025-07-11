import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { SessionsRepository } from './sessions.repository';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { SessionsRouter } from './sessions.router';
import { PrismaMysqlTransactionService } from 'src/services';
const providers = [
  PrismaServiceMysql,
  SessionsController,
  SessionsService,
  SessionsRepository,
  PrismaMysqlTransactionService,
];
@Module({
  controllers: [SessionsRouter],
  providers,
  exports: providers,
})
export class SessionsModule {}
