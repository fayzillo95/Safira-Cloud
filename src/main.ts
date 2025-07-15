import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setterAppConfigurations } from './global/set.global';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await setterAppConfigurations(app)
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
