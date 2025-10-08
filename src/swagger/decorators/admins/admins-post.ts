import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators';
import { CreateAdminDto } from 'src/modules/admins/dto/create-admin.dto';

export function admins_post() {
  return applyDecorators(
    SkipAuth(),
    Post(),
    ApiOperation({ summary: 'Create de admins.' }),
    ApiBody({ type: CreateAdminDto }),
  );
}
