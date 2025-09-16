import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateSessionSeatDto } from 'src/modules/session-seats/dto/create-session-seat.dto';

export function session_seats_patch() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de session-seats.' }),
    ApiBody({ type: CreateSessionSeatDto }),
  );
}
