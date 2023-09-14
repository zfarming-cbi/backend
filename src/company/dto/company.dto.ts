import { ApiProperty } from '@nestjs/swagger';

export class CompanyDTO {
  name: string;
  nit: string;
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  logo: any;
}
