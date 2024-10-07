import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class PumpSiteService{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}

      async addPumpSiteDetails(body:any) {
        try {
          console.log("body service",body)
          let resp = await this.deviceProxy
            .send({ cmd: 'addPumpSite' }, body)
            .toPromise();
          return resp;
        } catch (err) {
          console.log('err', err);
          return err;
        }
      } 


      async getAllPumpSite()
      {
        try{
            let resp = await this.deviceProxy
              .send({ cmd: 'getAllPump' },'')
              .toPromise();
            return resp;
        }
        catch(error)
        {
        console.log(error);
        return error;
        }
      }

      async getPumpSiteById(id:number)
      {
        try{
            let resp = await this.deviceProxy
              .send({ cmd: 'getIdPump' },id)
              .toPromise();
            return resp;
        }
        catch(error)
        {
        console.log(error);
        return error;
        }
      }

      async updatePumpSite(id:number,body:any){
        try{
            let resp = await this.deviceProxy
              .send({ cmd: 'updatePumpSite' },{id,body})
              .toPromise();
            return resp;
        }
        catch(error)
        {
        console.log(error);
        return error;
        }
      }

      async deletePumpSite(id:number)
      {
        try{
            let resp = await this.deviceProxy
              .send({ cmd: 'deletPump' },id)
              .toPromise();
            return resp;
        }
        catch(error)
        {
            console.log(error);
          return error;
         
        }
      }
}
