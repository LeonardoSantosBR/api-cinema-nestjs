import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roles_key } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      roles_key,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;
    const { user } = context.switchToHttp().getRequest();
    if (!user || !requiredRoles.includes(user.role))
      throw new ForbiddenException('Acesso negado: permissão insuficiente');

    return true;
  }
}
