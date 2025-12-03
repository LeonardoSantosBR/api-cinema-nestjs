import { applyDecorators, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { CreateSessionDto } from 'src/modules/sessions/dto/create-session.dto';

export function sessions_patch() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de sessions.' }),
    ApiBody({ type: CreateSessionDto }),
    UseGuards(RolesGuard),
    Roles('ADMIN'),
  );
}
