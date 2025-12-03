import { applyDecorators, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { CreateMovieDto } from 'src/modules/movies/dto/create-movie.dto';

export function movies_post() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create de movies.' }),
    ApiBody({ type: CreateMovieDto }),
    UseGuards(RolesGuard),
    Roles('ADMIN'),
  );
}
