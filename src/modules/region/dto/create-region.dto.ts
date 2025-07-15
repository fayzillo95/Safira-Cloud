import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateRegionDto {

  @ApiProperty({ example: 'Toshkent', description: 'Region nomi minimal uzunligi 2-ta belgi !' })
  @IsString()
  @MinLength(3)
  name: string;
}