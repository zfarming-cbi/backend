import { ApiProperty } from '@nestjs/swagger';

export class FarmDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  start_crop_dt: string;
  @ApiProperty()
  end_crop_dt: string;
}
