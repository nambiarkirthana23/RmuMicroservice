import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmconfigAsync } from './configs/typeorm.config';
import { RidModule } from './rid/modules/rid.module';
import { DeviceModule } from './device/modules/device.module';
import { StateModule } from './portals/states/state.module';
import { VendorModule } from './portals/vendors/vendor.module';
import { SimModule } from './sims/sim.module';
import { ConfigsModule } from './config-api/configs.module';
import { AgencyModule } from './masters/agency_masters/agency.module';
import { ControllerModule } from './masters/controller_masters/controller.module';
import { MotorModule } from './masters/motor_masters/motor.module';
import { OemModule } from './masters/oem_masters/oem.module';
import { ProjectModule } from './masters/project_masters/project.module';
import { PumpModelModule } from './masters/pump_model_master/pump_model.module';
import { SolarPumpModule } from './masters/solar_pump/solar_pump.module';
import { FarmerModule } from './configurations/farmers/module/farmer.module';
import { PumpSiteModule } from './configurations/pump_site/module/pump_site.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmconfigAsync),
    ClientsModule.register([
    {
      name: 'DEVICE_SERVICE',
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  ]),RidModule,DeviceModule,StateModule,VendorModule,
  SimModule,ConfigsModule,AgencyModule,
  ControllerModule,MotorModule,OemModule,ProjectModule,
  PumpModelModule,SolarPumpModule,FarmerModule,PumpSiteModule,UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
