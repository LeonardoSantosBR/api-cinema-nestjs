import { applyDecorators, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { CreateRoomDto } from 'src/modules/rooms/dto/create-room.dto';

export function rooms_patch() {
  return applyDecorators(
    Patch('/:id'),
    ApiOperation({ summary: 'Patch de rooms.' }),
    ApiBody({ type: CreateRoomDto }),
    UseGuards(RolesGuard),
    Roles('admin'),
  );
}
