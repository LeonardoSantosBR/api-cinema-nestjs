import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateCinemaDto } from '../dto/create-cinema.dto';

export function cinemas_path() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de cinemas.' }),
    ApiBody({ type: CreateCinemaDto }),
  );
}
