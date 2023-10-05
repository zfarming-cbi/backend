import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../constants';

export const ROLES_KEY = 'ROLES';
export const Roles = (...roles: ROLES_TYPE) => SetMetadata(ROLES_KEY, roles);

export type ROLES_TYPE = Array<keyof typeof ROLES>;
