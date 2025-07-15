import { Module } from '@nestjs/common';
import { AuthModule } from './modules/security/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CoreModule } from './core/core.module';
import { AdminModule } from './modules/security/admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';
import { RegionModule } from './modules/region/region.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ContactModule } from './modules/contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:[".env"]
    }),
    AuthModule, 
    UsersModule,
    CoreModule,
    AdminModule,
    CategoryModule,
    RegionModule,
    ProfileModule,
    ContactModule],

})
export class AppModule {}
