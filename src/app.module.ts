import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    DatabaseModule,
    AuthModule,
    CompanyModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
