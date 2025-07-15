import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtSubModule } from 'src/core/jwt/jwt.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DeviceMiddleware } from '../../../global/middlewares/device.middleware';
import { EmailModule } from 'src/core/email/email.module';
import { UsersService } from 'src/modules/users/users.service';
import { RedisSubModule } from 'src/core/redis/redis.module';

@Module({
  imports : [
    JwtSubModule,
    EmailModule,
    RedisSubModule
  ],
  controllers: [AuthController],
  providers: [AuthService,UsersService],
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeviceMiddleware).forRoutes(AuthController);
  }
}
