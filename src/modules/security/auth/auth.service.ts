import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';
import { JwtSubService } from 'src/core/jwt/jwt.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { EmailService } from 'src/core/email/email.service';
import { RedisService } from 'src/core/redis/redis.service';
import {
    DeviceType,
    getPayloadRegisterRedisValue,
    sendVerifyButtonToEmail,
} from '../../../common/config/auth-config/auth.secrets';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { jwtTokenTypeEnum, JwtVerfyPayload } from 'src/common/config/jwt-config/jwt.secrets';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtSubService,
        private readonly prisma: PrismaService,
        private readonly emailService: EmailService,
        private readonly redisService: RedisService,
        private readonly config: ConfigService,
    ) { }

    async sendVerifyUrl(data: RegisterDto, device: DeviceType, req: Request) {
        const { email } = data;

        // 1. Email bazada bormi?
        const userExists = await this.prisma.user.findFirst({ where: { email } });
        if (userExists) {
            throw new ConflictException('User email already exists!');
        }

        // 2. Redisda allaqachon verify link bo‘lsa
        const alreadyInRedis = await this.redisService.get(email);
        if (alreadyInRedis) {
            await this.redisService.del(email)
            throw new ConflictException('Verify URL already sent. Try later.');
        }

        const redisPayload: string = getPayloadRegisterRedisValue(data, device, 12345); 
        await this.redisService.set(email, redisPayload, 300); // 300s = 5 min

        const verifyToken = await this.jwtService.getVerfyToken(req, {
            email,
            code: 12345,
        });

        const verifyEmailContent = sendVerifyButtonToEmail(
            verifyToken,
            'no-reply@safira.uz',
            this.config,
        );

        // 6. Email yuborish
        await this.emailService.sendMail(email, 'Email tasdiqlash', verifyEmailContent.html);

        return {
            message: 'Tasdiqlash havolasi emailingizga yuborildi!',
            url : verifyEmailContent.html
        };
    }
    async verifyUser(token: string) {
        // 1. Tokendan ma'lumotni yechib olish
        let payload: JwtVerfyPayload;
        try {
            payload = await this.jwtService.verifyToken<JwtVerfyPayload>(token,jwtTokenTypeEnum.VERIFY);
        } catch (err) {
            throw new UnauthorizedException("Token noto'g'ri yoki muddati o'tgan!");
        }

        // 2. Redisdan vaqtinchalik ma’lumotni olish
        const redisData = await this.redisService.get(payload.email);
        if (!redisData) {
            throw new BadRequestException('Tasdiqlash muddati tugagan yoki topilmadi');
        }

        const parsedData = JSON.parse(redisData);
        console.log(parsedData)
        // 5. Redisni tozalash
        await this.redisService.del(payload.email);

        return parsedData
    }
}
