import { SetMetadata } from '@nestjs/common';
import { GROUPS } from '../constants';

export const GROUPS_KEY = 'groups';
export const Groups = (...groups: GROUPS[]) => SetMetadata(GROUPS_KEY, groups);
