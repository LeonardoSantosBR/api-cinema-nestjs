import { applyDecorators, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { CreateCinemaDto } from 'src/modules/cinemas/dto/create-cinema.dto';

export function cinemas_path() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de cinemas.' }),
    ApiBody({ type: CreateCinemaDto }),
    UseGuards(RolesGuard),
    Roles('admin'),
  );
}
