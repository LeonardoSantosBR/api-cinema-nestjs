import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersRouter } from './users.router';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
import { HashService } from 'src/services';
const providers = [
  PrismaServiceMysql,
  UsersController,
  UsersService,
  UsersRepository,
  HashService,
];

@Module({
  controllers: [UsersRouter],
  providers,
  exports: providers,
})
export class UsersModule {}
