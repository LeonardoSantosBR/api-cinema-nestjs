import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateSessionSeatDto } from 'src/modules/session-seats/dto/create-session-seat.dto';

export function session_seats_post() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create de session-seats.' }),
    ApiBody({ type: CreateSessionSeatDto }),
  );
}
