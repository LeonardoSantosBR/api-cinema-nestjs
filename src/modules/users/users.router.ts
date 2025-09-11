import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { querySearchUser } from './dto/query-search-user';
import { UsersController } from './users.controller';
import { getUser } from 'src/decorators';
import { IuserToken } from 'src/types';
import { SkipAuth } from '../../decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('usuários')
@Controller('users')
export class UsersRouter {
  constructor(private readonly $usersController: UsersController) {}

  @SkipAuth()
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.$usersController.create(body);
  }

  @Get('/find-my-sessions')
  async findMySessions(@getUser() user: IuserToken) {
    const { id } = user;
    return await this.$usersController.findMySessions(id);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.$usersController.findOne(id);
  }

  @Get()
  async findAll(@Query() query: querySearchUser) {
    return await this.$usersController.findAll(query);
  }

  @Patch('/:id')
  async update(@Body() body: UpdateUserDto, @Param('id') id: string) {
    return await this.$usersController.update(id, body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.$usersController.remove(id);
  }
}
