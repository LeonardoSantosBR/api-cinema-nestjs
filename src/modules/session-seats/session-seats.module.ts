import { Module } from '@nestjs/common';
import { SessionSeatsService } from './session-seats.service';
import { SessionSeatsController } from './session-seats.controller';
import { SessionSeatsRepository } from './session-seats-repository';
import { SessionSeatsRouter } from './session-seats-router';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
const providers = [
  PrismaServiceMysql,
  SessionSeatsController,
  SessionSeatsService,
  SessionSeatsRepository,
];

@Module({
  controllers: [SessionSeatsRouter],
  providers,
  exports: providers,
})
export class SessionSeatsModule {}
