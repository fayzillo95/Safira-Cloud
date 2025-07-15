import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, IsEnum, IsInt } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'Fayzillo Ummatov',
    description: 'Foydalanuvchi to\'liq ismi',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'fayzillo@gmail.com',
    description: 'Foydalanuvchi email manzili',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secret123',
    description: 'Kamida 6 ta belgidan iborat parol',
  })
  @IsString()
  @MinLength(6, { message: 'Password kamida 6 ta belgidan iborat bo\'lishi kerak' })
  password: string;

  @ApiPropertyOptional({
    example: 'guest',
    enum: Role,
    description: 'Foydalanuvchi roli (default: guest)',
  })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiPropertyOptional({
    example: 3,
    description: 'Region ID (ixtiyoriy)',
  })
  @IsOptional()
  @IsInt()
  regionId?: number;
}
