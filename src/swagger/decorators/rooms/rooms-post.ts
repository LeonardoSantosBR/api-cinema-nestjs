import { applyDecorators, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateRoomDto } from 'src/modules/rooms/dto/create-room.dto';

export function rooms_post() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create de rooms.' }),
    ApiBody({ type: CreateRoomDto }),
  );
}
