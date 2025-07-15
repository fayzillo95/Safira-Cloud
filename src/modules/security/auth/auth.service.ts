import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtSubService } from 'src/core/jwt/jwt.service';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtServie : JwtSubService,
        private readonly prisma : PrismaService
    ){}

    async sendVerifyUrl(data : RegisterDto){
        const user = await this.prisma.user.create({data})
        const result = {
            accessToken : await this.jwtServie.getAccessToken(user),
            refreshToken : await this.jwtServie.getRefreshToken(user)
        }
        console.log(user)
        return result
    }
}
