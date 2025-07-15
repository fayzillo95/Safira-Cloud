import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtSubModule } from './jwt/jwt.module';
import { EmailModule } from './email/email.module';
import { RedisSubModule } from './redis/redis.module';

@Module({
  imports: [PrismaModule, JwtSubModule, EmailModule, RedisSubModule]
})
export class CoreModule {}
