import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './roles.repository';
import { Prisma, Roles } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private readonly $rolesRepository: RolesRepository) {}

  async create(data: CreateRoleDto) {
    return await this.$rolesRepository.create(data);
  }

  async findAll(params: Prisma.RolesFindManyArgs) {
    const [rows, count]: [Roles[], number] = await Promise.all([
      this.$rolesRepository.findAll(params),
      this.$rolesRepository.count({
        where: params.where || {},
      }),
    ]);
    return { rows, count };
  }

  async findOne(id?: number, arg?: Prisma.RolesFindFirstArgs) {
    const where = arg?.where || { id, deleted_at: null };
    const query = await this.$rolesRepository.findOne({
      where,
      ...arg,
    });

    return query;
  }

  async update(id: number, data: UpdateRoleDto) {
    return await this.$rolesRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.$rolesRepository.remove(id);
  }
}
