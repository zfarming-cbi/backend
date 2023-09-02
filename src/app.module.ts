import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { FarmModule } from './farm/farm.module';
import { DeviceModule } from './device/device.module';
import { PlantModule } from './plant/plant.module';
import { SensorModule } from './sensor/sensor.module';

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
    FarmModule,
    DeviceModule,
    PlantModule,
    SensorModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
