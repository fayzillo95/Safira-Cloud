import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { IsString, Length } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({ example: 'Mevalar', description: 'Kategoriya nomi', })
    @IsString()
    @Length(2, 40)
    name: string;
}
