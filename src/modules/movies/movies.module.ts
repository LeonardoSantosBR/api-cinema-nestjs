import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { MoviesRouter } from './movies.router';
import { MoviesRepository } from './movies.repository';
import { PrismaServiceMysql } from 'src/database/prisma_mysql.service';
const providers = [
  PrismaServiceMysql,
  MoviesController,
  MoviesService,
  MoviesRepository,
];

@Module({
  controllers: [MoviesRouter],
  providers,
  exports: providers,
})
export class MoviesModule {}
