import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Device } from 'src/global/decorators/device.getter.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Device() device: { ip: string; agent: string },
    @Body() dto: RegisterDto
  ) {
    console.log(device,dto)
    // const verifyToken = await this.jwtSubService.getVerifyToken({
    //   email: dto.email,
    //   code: randomCode(),
    //   ...device
    // });
    return this.authService.sendVerifyUrl(dto)
    // tokenni emailga yuborish va hokazo
  }

}
