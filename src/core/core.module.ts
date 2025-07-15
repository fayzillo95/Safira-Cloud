import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { JwtSubModule } from './jwt/jwt.module';
import { EmailModule } from './email/email.module';
import { CasheModule } from './cashe/cashe.module';

@Module({
  imports: [PrismaModule, JwtSubModule, EmailModule, CasheModule]
})
export class CoreModule {}
