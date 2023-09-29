import { SetMetadata } from '@nestjs/common';
import { GROUPS } from '../constants';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: GROUPS[]) => SetMetadata(ROLES_KEY, roles);
