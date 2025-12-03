import { applyDecorators, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { CreateMovieDto } from 'src/modules/movies/dto/create-movie.dto';

export function movies_patch() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de movies.' }),
    ApiBody({ type: CreateMovieDto }),
    UseGuards(RolesGuard),
    Roles('ADMIN'),
  );
}
