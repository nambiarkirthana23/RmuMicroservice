import { InjectRepository } from "@nestjs/typeorm";
import { PumpSite } from "../entity/pump_site.entity";
import { CommonService } from "src/device/services/common-service";
import { Repository } from "typeorm";
import { CONSTANT_MSG } from "src/common-dto/const";
import { HttpStatus } from "@nestjs/common";

export class PumpSiteService
{
  constructor(
@InjectRepository(PumpSite)
private readonly pumpSiteRepository:Repository<PumpSite>,
private readonly commonService:CommonService
  )  {}
  async addPumpSiteDetail(body: any) {
    try {
        let exist = await this.getFarmerByRid(body.rid);
        console.log(exist);
        if (exist.statusCode === HttpStatus.OK) {
            return this.commonService.errorMessage(
                [],
                CONSTANT_MSG.ID_EXIST,
                HttpStatus.CONFLICT,
            );
        } else {
            let resp = await this.pumpSiteRepository.save(body);
            console.log('resp', resp);
            if (!resp) {
                return this.commonService.errorMessage(
                    [],
                    CONSTANT_MSG.UNABLE_TO_ADD,
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                return this.commonService.successMessage(
                    resp,
                    CONSTANT_MSG.FARMER_ADDED_SUCCESSFULLY,
                    HttpStatus.CREATED,
                );
            }
        }
    }
    catch (err) {
        console.log('err', err);
        return this.commonService.errorMessage(
            {},
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}

async getFarmerByRid(rid: string) {
    try {
        console.log("rid");
        let exist = await this.pumpSiteRepository.findOne({ where: { rid } });
        console.log("exist", exist);
        if (!exist) {
            return this.commonService.errorMessage(
                [],
                CONSTANT_MSG.FETCH_ERROR,
                HttpStatus.BAD_REQUEST,
            );
        } else {
            return this.commonService.successMessage(
                exist,
                CONSTANT_MSG.FETCH_SUCCESSFULLY,
                HttpStatus.OK,
            );
        }
    } catch (err) {
        return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}


  async getAllPumpSite()
  {
    try{
     let resp=await this.pumpSiteRepository.find()
     if(!resp)
     {
        return this.commonService.errorMessage('',CONSTANT_MSG.FAILED_PUMP_SITE_DATA,HttpStatus.INTERNAL_SERVER_ERROR)
     }
     else{
        return this.commonService.successMessage(resp,CONSTANT_MSG.RETRIEVED_PUMP_SITE_DATA,HttpStatus.OK)
     }
    }
    catch(error)
    {
      console.log(error);
      return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
    }
  
  }


  async getPumpById(id:number)
  {
    try{
    let resp=await this.pumpSiteRepository.findOne({where:{ref_id:id}});
    if(!resp)
    {
        return this.commonService.errorMessage('',CONSTANT_MSG.FAILED_TO_RETRIEVE_PUMP_SITE_DATA,HttpStatus.BAD_REQUEST)
    }
    else{
        return this.commonService.successMessage(resp,CONSTANT_MSG.RETRIEVE_SUCCESSFULLY,HttpStatus.OK)
    }
  }
  catch(error)
  {
    console.log(error);
    return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
  }

  }

  async updatePumpSite(id:number,body:any)
  {
    try{
        let ref_id=await this.pumpSiteRepository.findOne({where:{ref_id:id}});
        if(!ref_id)
        {
            return this.commonService.successMessage('',CONSTANT_MSG.ID_NOT_FOUND,HttpStatus.NOT_FOUND);
        }
        let updatePump=await this.pumpSiteRepository.update({ref_id:id},body)
           

        if(!updatePump)
        {
            return this.commonService.errorMessage('',CONSTANT_MSG.FAILED_TO_RETRIEVE_PUMP_SITE_DATA,HttpStatus.BAD_REQUEST)
        }
        else{
            return this.commonService.successMessage(updatePump,CONSTANT_MSG.UPDATED_PUMP_SITE_SUCCESSFULLY,HttpStatus.ACCEPTED)
        }
      }
      catch(error)
      {
        console.log(error);
        return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
      }
  }
  async deletePumpSite(id:number)
  {
    try{
        let idToDelete=await this.pumpSiteRepository.findOne({where:{ref_id:id}});
        let deletePump=await this.pumpSiteRepository.delete(idToDelete)

        if(!deletePump)
        {
            return this.commonService.errorMessage('',CONSTANT_MSG.FAILED_TO_RETRIEVE_PUMP_SITE_DATA,HttpStatus.BAD_REQUEST)
        }
        else{
            return this.commonService.successMessage(deletePump,CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,HttpStatus.ACCEPTED)
        }
      }
      catch(error)
      {
        console.log(error);
        return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
      }
  }




}