import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateRoomDto } from 'src/modules/rooms/dto/create-room.dto';

export function rooms_patch() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de rooms.' }),
    ApiBody({ type: CreateRoomDto }),
  );
}
