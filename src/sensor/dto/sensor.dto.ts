import { ApiProperty } from '@nestjs/swagger';

export class SensorDTO {
  @ApiProperty()
  code: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  graphical_unit: string;
  @ApiProperty()
  min_range: number;
  @ApiProperty()
  max_range: number;
}
