import { ApiPropertyOptional } from '@nestjs/swagger';

export class FarmDTO {
  name: string;
  description: string;
  start_crop_dt: string;
  end_crop_dt: string;
}

export class ShowFarmDTO {
  @ApiPropertyOptional()
  option: string;
}
