import { applyDecorators, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { UpdateRoleDto } from 'src/modules/roles/dto/update-role.dto';

export function roles_path() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de roles.' }),
    ApiBody({ type: UpdateRoleDto }),
    UseGuards(RolesGuard),
    Roles('ADMIN'),
  );
}
