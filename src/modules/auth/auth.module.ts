import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRouter } from './auth.router';
import { HashService } from 'src/services';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';

const providers = [
  AuthController,
  AuthService,
  HashService,
  JwtService,
  UsersService,
  UsersRepository,
  PrismaServiceMysql,
];

@Module({
  controllers: [AuthRouter],
  providers,
  exports: providers,
})
export class AuthModule {}
