import { Module } from "@nestjs/common";
import { ConfigController } from "./configs.controller";
import { ConfigService } from "./configs.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigTable } from "src/device/entities/config.entity";
import { CommonService } from "src/device/services/common-service";
import { RidModule } from "src/rid/modules/rid.module";
import { FlowFormula } from "src/device/entities/flow_formula.entity";
import { Rid } from "src/device/entities/rid.entity";
import { RidConfig } from "src/device/entities/rid_config.entity";


@Module({
    imports:[
        TypeOrmModule.forFeature([FlowFormula,ConfigTable,Rid,RidConfig]),
        ClientsModule.register([
            {
              name: 'DEVICE_SERVICE',
              transport: Transport.TCP,
              options: {
                host: 'localhost',
                port: 3001,
              },
            },
          ]),RidModule
    ],
    controllers:[ConfigController],
    providers:[ConfigService,CommonService],
    exports:[ConfigService]
})
export class ConfigsModule{}