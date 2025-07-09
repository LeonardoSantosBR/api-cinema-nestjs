import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsRepository } from './rooms.repository';
import { PrismaMysqlTransactionService } from 'src/services';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { RoomsRouter } from './rooms.router';
const providers = [
  PrismaServiceMysql,
  RoomsController,
  RoomsService,
  RoomsRepository,
  PrismaMysqlTransactionService,
];

@Module({
  controllers: [RoomsRouter],
  providers,
  exports: providers,
})
export class RoomsModule {}
