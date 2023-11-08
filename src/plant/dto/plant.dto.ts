import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

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

export class CopyPlantDTO {
  name: string;
  content: string;
  public: boolean;
  growing_time: string;
  image: string;
}

export class UpdatePlantDTO {
  @ApiPropertyOptional()
  name?: string;
  @ApiPropertyOptional()
  content?: string;
  @ApiPropertyOptional()
  public?: boolean;
  @ApiPropertyOptional()
  growing_time?: string;
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  image?: any;
}
