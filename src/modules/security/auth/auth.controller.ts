import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Device } from 'src/global/decorators/device.getter.decorator';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Device() device: { ip: string; agent: string },
    @Body() dto: RegisterDto,
    @Req() req: Request
  ) {
    console.log(device, dto)
    return this.authService.sendVerifyUrl(dto, device, req)
  }
  @Get('verify/:token')
  async verifyUser(@Param('token') token: string) {
    return this.authService.verifyUser(token);
  }
}
