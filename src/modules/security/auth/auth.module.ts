import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtSubModule } from 'src/core/jwt/jwt.module';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DeviceMiddleware } from '../../../global/middlewares/device.middleware';

@Module({
  imports : [
    JwtSubModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeviceMiddleware).forRoutes(AuthController);
  }
}
