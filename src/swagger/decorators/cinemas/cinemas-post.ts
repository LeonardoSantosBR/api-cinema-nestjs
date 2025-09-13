import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateCinemaDto } from 'src/modules/cinemas/dto/create-cinema.dto';

export function cinemas_post() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create de cinemas.' }),
    ApiBody({ type: CreateCinemaDto }),
  );
}
