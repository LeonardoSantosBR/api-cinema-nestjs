import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateMovieDto } from 'src/modules/movies/dto/create-movie.dto';

export function movies_patch() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de movies.' }),
    ApiBody({ type: CreateMovieDto }),
  );
}
