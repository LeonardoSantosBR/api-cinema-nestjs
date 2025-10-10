import { applyDecorators, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { CreateRoomDto } from 'src/modules/rooms/dto/create-room.dto';

export function rooms_post() {
  return applyDecorators(
    Post(),
    ApiOperation({ summary: 'Create de rooms.' }),
    ApiBody({ type: CreateRoomDto }),
    UseGuards(RolesGuard),
    Roles('admin'),
  );
}
