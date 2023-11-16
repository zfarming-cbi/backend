import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginationDTO {
  page: string = '1';
  perPage: string = '10';
  @ApiPropertyOptional()
  search: string = '';
  @ApiPropertyOptional()
  order: string = '';
}
