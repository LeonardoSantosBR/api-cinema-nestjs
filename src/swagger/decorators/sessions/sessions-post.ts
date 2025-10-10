import { applyDecorators, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { CreateSessionDto } from 'src/modules/sessions/dto/create-session.dto';

export function sessions_post() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create de sessions.' }),
    ApiBody({ type: CreateSessionDto }),
    UseGuards(RolesGuard),
    Roles('admin'),
  );
}
