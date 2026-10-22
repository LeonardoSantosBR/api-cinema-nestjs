import { applyDecorators, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SkipAuth } from 'src/decorators';

export function health() {
  return applyDecorators(
    SkipAuth(),
    Get(),
    ApiOperation({ summary: 'health.' }),
  );
}
