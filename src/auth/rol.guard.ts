import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, ROLES_TYPE } from './decorators/roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<boolean>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) as unknown as ROLES_TYPE;

    const request = context.switchToHttp().getRequest() as any;

    const { user } = request;

    console.log('****user', user);
    console.log('****roles', roles);
    if (!roles) {
      return true;
    }
    if (!user) {
      throw new UnauthorizedException('login is required');
    }
    if (roles.includes(user?.rol)) return true;
    throw new UnauthorizedException("you don't have permissions");
  }
}
