import { ApiProperty } from '@nestjs/swagger';

export class PlantDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  content: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  public: string;
  @ApiProperty()
  growing_time: string;
}
