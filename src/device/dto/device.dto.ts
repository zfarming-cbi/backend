import { ApiProperty } from '@nestjs/swagger';

export class DeviceDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  code: string;
  @ApiProperty()
  farmId: number;
  @ApiProperty()
  plantId: number;
}
