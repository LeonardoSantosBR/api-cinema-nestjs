import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

export function movies_get() {
  return applyDecorators(Get(), ApiOperation({ summary: 'Get de movies.' }));
}
