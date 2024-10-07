import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

export class GatewayFarmerService{
    constructor(
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,
      ) {}
    
      async addProject(body:any) {
        try {
          console.log("add farmer service",body)
          let resp = await this.deviceProxy
            .send({ cmd: 'addFarmer' }, body)
            .toPromise();
          return resp;
        } catch (err) {
          console.log('err', err);
          return err;
        }
      } 

      async getProjectDetails()
      {
        try {
          let resp = await this.deviceProxy
            .send({ cmd: 'getFarmers' }, '')
            .toPromise();
          return resp;
        } catch (err) {
          console.log('err', err);
          return err;
        }
      }
      

      async updateProjectDetails(id:number,body:any)
      {
        try {
          console.log("id",id);
          console.log("body",body)
          let resp = await this.deviceProxy
            .send({ cmd: 'updateProject' }, {id,body})
            .toPromise();
          return resp;
        } catch (err) {
          console.log('err', err);
          return err;
        }
      }

    
}