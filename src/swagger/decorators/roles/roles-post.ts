import { applyDecorators, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { CreateRoleDto } from 'src/modules/roles/dto/create-role.dto';

export function roles_post() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create de roles.' }),
    ApiBody({ type: CreateRoleDto }),
    UseGuards(RolesGuard),
    Roles('ADMIN'),
  );
}
