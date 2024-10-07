import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { YearMonth } from "./year_month.entity";
import { Repository } from "typeorm";

@Injectable()
export class DeviceStatusService
{
    constructor(@InjectRepository(YearMonth)
    private readonly yearMonthRepository: Repository<YearMonth>,){}
 async addDeviceData(data:any)
 {
   try{
    const timestamp=new Date(data.timestamp);
    const month=timestamp.getMonth()+1;
    const year=timestamp.getDate();

    

   }
   catch(error)
   {

   }
 }
}