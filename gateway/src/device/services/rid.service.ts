import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { cDevice } from '../interfaces/device.interface';


@Injectable()
export class RidService {
  constructor(
    @Inject('DEVICE_SERVICE') private readonly deviceProxy: ClientProxy,
  ) {}

  async addRID(rid:string,CONT_MFR:string){
    try{
    const resp =await this.deviceProxy.send({cmd:'addRID'},{rid,CONT_MFR}).toPromise();
    return resp;
    }catch(err){
        console.log(err)
        return err;
    }
  }

  async getConfig(rid_ref_id:number){
    try{
      console.log("gws",rid_ref_id)
      const resp =await this.deviceProxy.send({cmd:'checkConfig'},{rid_ref_id}).toPromise();
      return resp;
      }catch(err){
          console.log(err)
          return err;
      }
  }
}