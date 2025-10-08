import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateAdminDto } from 'src/modules/admins/dto/create-admin.dto';

export function admins_patch() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de admins.' }),
    ApiBody({ type: CreateAdminDto }),
  );
}
