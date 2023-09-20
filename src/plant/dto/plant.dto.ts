import { ApiProperty } from '@nestjs/swagger';

export class PlantDTO {
  name: string;
  content: string;
  public: boolean;
  growing_time: string;
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  image: any;
}

export class PaginationPlantDTO {
  page: string = '1';
  perPage: string = '5';
}
