import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { UsersModule } from './user/users.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { FarmModule } from './farm/farm.module';
import { DeviceModule } from './device/device.module';
import { PlantModule } from './plant/plant.module';
import { SensorModule } from './sensor/sensor.module';
import { MeasuringHistoryModule } from './measuringHistory/measuringHistory.module';
import { MailModule } from './mail/mail.module';
import { RolModule } from './rol/rol.module';
import { MulterModule } from '@nestjs/platform-express';
import { PlantGaleryCommentModule } from './plantGaleryComment/plantGaleryComment.module';
import { PlantGaleryLikeModule } from './plantGaleryLikes/plantGaleryLike.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    MulterModule.register({
      dest: './uploads', // Directorio de almacenamiento para los archivos cargados.
    }),
    DatabaseModule,
    AuthModule,
    CompanyModule,
    UsersModule,
    FarmModule,
    DeviceModule,
    PlantModule,
    SensorModule,
    MailModule,
    MeasuringHistoryModule,
    RolModule,
    PlantGaleryCommentModule,
    PlantGaleryLikeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
