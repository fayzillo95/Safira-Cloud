import { Module } from '@nestjs/common';
import { CasheService } from './cashe.service';

@Module({
  providers: [CasheService]
})
export class CasheModule {}
