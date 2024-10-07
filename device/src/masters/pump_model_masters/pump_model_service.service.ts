import { InjectRepository } from "@nestjs/typeorm";
import { HttpStatus } from "@nestjs/common";
import { PumpModel } from "../pump_model_master/pump_model.entity";
import { CONSTANT_MSG } from "src/common-dto/const";
import { CommonService } from "src/device/services/common-service";
import { Repository } from "typeorm";

export class PumpModelMasterService{
    constructor(private commonService:CommonService,
        @InjectRepository(PumpModel)
    private readonly pumpModelRepository: Repository<PumpModel>){}

    async addPump(body:any){
        try {
            console.log(body);
        
          let getP = await this.getOEMByName(body.model);
          console.log("getP",getP);
           
          if (getP.statusCode === HttpStatus.OK && getP.data.length > 0) {
            return this.commonService.errorMessage('',CONSTANT_MSG.OEM_ALREADY_EXIST,HttpStatus.BAD_REQUEST);
            }
          let query=await this.pumpModelRepository.save(body);
          console.log(query)
          if (query) {
            return this.commonService.successMessage(query,CONSTANT_MSG.SUCCESSFULLY_ADDED,HttpStatus.CREATED)
          } else {
             return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TO_ADD,HttpStatus.BAD_REQUEST)
          }
        } catch (err) {
          return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    


      async getOEMByName(model: any) {
        try {
         console.log("getOEMByName",name);
         // let query = `select * from oem_master where name = '${name}';`;
          let query=await this.pumpModelRepository.find({where:{model}})
          console.log("getOEMByName",query)
          if (query) {
            return this.commonService.successMessage(query,CONSTANT_MSG.GET_OEM_DETAILS,HttpStatus.OK)
          } else {
            return this.commonService.errorMessage('',CONSTANT_MSG.FAILED_TO_GET_OEM_DETAILS,HttpStatus.BAD_REQUEST)
          }
    
        } catch (err) {
          console.log(err);
          return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,HttpStatus.INTERNAL_SERVER_ERROR)
        }
      }


}