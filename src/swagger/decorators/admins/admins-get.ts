import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function admins_get() {
  return applyDecorators(Get(), ApiOperation({ summary: 'Get de admins.' }));
}
