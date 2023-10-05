import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../constants';

export const ADMIN_KEY = 'ADMIN';
export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);
