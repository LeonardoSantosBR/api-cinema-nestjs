import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function users_get() {
  return applyDecorators(Get(), ApiOperation({ summary: 'Get de users.' }));
}
