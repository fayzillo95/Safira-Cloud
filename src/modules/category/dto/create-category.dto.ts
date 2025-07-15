import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Mevalar', description: 'Kategoriya nomi',})
  @IsString()
  @Length(2, 40)
  name: string;
}

