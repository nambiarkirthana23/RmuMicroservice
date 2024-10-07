import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { CommonService } from "src/device/services/common-service";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRoles } from "./user_roles.entity";
import { Permission } from "./permission.entity";
import { UserRid } from "./user_rid.entity";
import { Rid } from "src/device/entities/rid.entity";

@Module({
    imports:[
        TypeOrmModule.forFeature([User,UserRoles,Permission,UserRid,Rid]),
        ClientsModule.register([
            {
              name: 'DEVICE_SERVICE',
              transport: Transport.TCP,
              options: {
                host: 'localhost',
                port: 3001,
              },
            },
          ])
    ],
    controllers:[UserController],
    providers:[UserService,CommonService],
    exports:[]
})
export class UserModule{}