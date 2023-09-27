import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateCompanyDTO {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  nit?: string;
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  logo?: any;
}
