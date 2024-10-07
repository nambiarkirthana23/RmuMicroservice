import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommonService } from "src/device/services/common-service";
import { FarmerController } from "../controllers/farmers.controller";
import { FarmerService } from "../service/farmer.service";
import { FarmerProjectDetails } from "../entities/farmer.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([FarmerProjectDetails]),
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
    controllers:[FarmerController],
    providers:[FarmerService,CommonService],
    exports:[]
})
export class FarmerModule{}