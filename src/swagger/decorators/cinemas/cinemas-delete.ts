import { applyDecorators, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';

export function cinemas_delete() {
  return applyDecorators(
    Delete('/:id'),
    ApiOperation({ summary: 'Delete de cinemas.' }),
    UseGuards(RolesGuard),
    Roles('admin'),
  );
}
