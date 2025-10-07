import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { AdminsRepository } from './admins.repository';
import { AdminsRouter } from './admins.router';
import { HashService } from 'src/services';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
const providers = [
  AdminsController,
  AdminsService,
  AdminsRepository,
  HashService,
  PrismaServiceMysql,
];

@Module({
  controllers: [AdminsRouter],
  providers,
})
export class AdminsModule {}
