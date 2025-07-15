import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {
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
        example: 3,
        description: 'Region ID (ixtiyoriy)',
    })
    @IsOptional()
    @IsInt()
    regionId?: number;
}
