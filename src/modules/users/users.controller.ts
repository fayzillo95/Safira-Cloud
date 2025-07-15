import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('create-user')
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi yaratildi' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  @ApiResponse({ status: 200, description: 'Barcha foydalanuvchilar ro‘yxati' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('getOne/:id')
  @ApiOperation({ summary: 'Bitta foydalanuvchini olish' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID raqami' })
  @ApiResponse({ status: 200, description: 'Topilgan foydalanuvchi' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('updateOne/:id')
  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID raqami' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi yangilandi' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID raqami' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
