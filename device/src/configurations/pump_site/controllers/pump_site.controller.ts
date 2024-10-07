import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { PumpSiteService } from "../services/pump_site.service";

@Controller()
export class PumpSiteController
{
    constructor(private readonly pumpSiteService:PumpSiteService){}
    @MessagePattern({ cmd:'addPumpSite'})
    async addPumpSite(body: any) {
      try {
        console.log("body",body);
        let resp = await this.pumpSiteService.addPumpSiteDetail(body);
        return resp;
      } catch (err) {
        console.log('err', err);
        return err;
      }
    }


    @MessagePattern({ cmd:'getAllPump'})
    async getAllPump(body: any) {
      try {
        let resp = await this.pumpSiteService.getAllPumpSite();
        return resp;
      } catch (err) {
        console.log('err', err);
        return err;
      }
    }


    @MessagePattern({ cmd:'getIdPump'})
    async getPumpById(id:number) {
      try {
        let resp = await this.pumpSiteService.getPumpById(id);
        return resp;
      } catch (err) {
        console.log('err', err);
        return err;
      }
    }


    @MessagePattern({ cmd:'updatePumpSite'})
    async updatePumpSite(data:{id:number,body:any}) {
      try {
        // const{id,body}=data;
        let resp = await this.pumpSiteService.updatePumpSite(data.id,data.body);
        return resp;
      } catch (err) {
        console.log('err', err);
        return err;
      }
    }

    @MessagePattern({ cmd:'deletPump'})
    async deletePumpSite(id:number) {
      try {
        let resp = await this.pumpSiteService.deletePumpSite(id);
        return resp;
      } catch (err) {
        console.log('err', err);
        return err;
      }
    }









}