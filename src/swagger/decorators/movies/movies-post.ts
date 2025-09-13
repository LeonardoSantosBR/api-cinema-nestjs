import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateMovieDto } from 'src/modules/movies/dto/create-movie.dto';

export function movies_post() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create de movies.' }),
    ApiBody({ type: CreateMovieDto }),
  );
}
