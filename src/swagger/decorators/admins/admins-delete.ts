import { applyDecorators, Delete } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function admins_delete() {
  return applyDecorators(
    Delete('/:id'),
    ApiOperation({ summary: 'Delete de admins.' }),
  );
}
