import { MessagePattern } from "@nestjs/microservices";

import { FarmerService } from "../service/farmer.service";
import { Controller } from "@nestjs/common";
@Controller()
export class FarmerController
{
    constructor(private readonly farmerService:FarmerService ) {}
    @MessagePattern({ cmd:'addFarmer'})
    async addProject(body: any) {
      try {
        console.log(body);
        let resp = await this.farmerService.addProjectDetail(body);
        return resp;
      } catch (err) {
        console.log('err', err);
        return err;
      }
    }

    @MessagePattern({ cmd:'getFarmers'})
    async GetProjects() {
      try {
        let resp = await this.farmerService.getProjectDetails();
        return resp;
      } catch (err) {
        console.log('err', err);
        return err;
      }
    }


    @MessagePattern({ cmd:'deleteProjects'})
    async deleteProject(id:number) {
      try {
        let resp = await this.farmerService.deleteProjectDetails(id);
        return resp;
      } catch (err) {
        console.log('err', err);
        return err;
      }
    }

    @MessagePattern({cmd:'updateProject'})
    async updateProject(data:{id:number,body:any}) {
        try {
            const{id,body}=data;
            console.log(id);
            console.log(body);
          let resp = await this.farmerService.updateProjectDetails({id,body});
          return resp;
        } catch (err) {
          console.log('err', err);
          return err;
        }
      }









}