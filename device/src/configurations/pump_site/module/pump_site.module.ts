import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { PumpCodeController } from "src/masters/pump_code_master/pump_code.controller";
import { PumpSiteController } from "../controllers/pump_site.controller";
import { PumpSiteService } from "../services/pump_site.service";
import { PumpSite } from "../entity/pump_site.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([PumpSite]),
        ClientsModule.register([
            {
              name: 'DEVICE_SERVICE',
              transport: Transport.TCP,
              options: {
                host: 'localhost',
                port: 3001,
              },
            },
          ]),
    ],
    controllers:[PumpSiteController],
    providers:[PumpSiteService,CommonService],
    exports:[]
})
export class PumpSiteModule{}