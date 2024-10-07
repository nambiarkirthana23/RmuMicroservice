import { Controller, Req, Res } from "@nestjs/common";
import { ConfigService } from "./configs.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller('')
export class ConfigController {
  constructor(
    private readonly configService: ConfigService
  ) {}

  @MessagePattern({ cmd: 'getConfigs' })
  async getConfigs() {
    try {
      console.log("config");
      let config = await this.configService.getConfigs();
      return config;
    } catch (err) {
      console.log("err", err);
      return err;
    }
  }

  @MessagePattern({cmd:'getConfig'})
  async getConfig(ref_id:number){
    try{
     let config = await this.configService.getConfig(ref_id);
     return config;
    }catch(err){
        console.log("err",err)
        return err;
    }
  }

  @MessagePattern({cmd:'addConfig'})
  async addConfig(body:any){
    try{
      console.log("bodymp",body)
      let config = await this.configService.addConfig(body);
      return config;

    }catch(err){
      console.log("err",err)
      return err;
    }
  }

  // @MessagePattern({cmd:'updateCon'})
  // async updateConfig(data:{body:any,id:number}){
  //   try{
  //    const {body,id}=data
  //    let config = await this.configService.updateConfig(body,id)
  //    return config;
  //   }catch(err){
  //     console.log("err",err)
  //     return err;
  //   }
  // }

  @MessagePattern({cmd:'deleteConfig'})
  async deleteConfig(id:number){
    try{
      let config = await this.configService.deleteConfig(id)
      return config;

    }catch(err){
      console.log("err",err)
      return err
    }
  }

  @MessagePattern({ cmd: 'configDevice' })
  async registerDevice(data:{fcode: any, days_output: any}): Promise<any> {
    try {
        const{fcode,days_output}=data;
        console.log("data check------------------------------------",data);
      const device = await this.configService.addFlowFormula(fcode,days_output);
      console.log('dc', device);
      return device;
    } catch (err) {
      console.log('dc', err);
      return err;
    }
  }
    

  @MessagePattern({cmd:'getFlowFormula'})
  async getFlowFormulas():Promise<any>
  {
    try{
    const resp=await this.configService.getFlowFormulas();
    console.log("get flow formula",resp);
    return resp;
  }
  catch(error)
  {
    console.log("get flow formulas",error);
    return error;
  }
}


//getConfigs
@MessagePattern({cmd:'getConfigs'})
async getConfigsFlowFormula():Promise<any>
{
  try{
    const resp=await this.configService.getConfigsFlowFormula();
    return resp;

  }
  catch(error)
  {
    console.log(error);
    return error;

  }
}



@MessagePattern({cmd:'updateConfigflowf'})
async updateConfigFlowFormula(data:{params: any, id: any},@Req() req:any, @Res() res:any):Promise<any>
{
  try{
    const{params,id}=data;
    console.log(data);
    const { fcode, days_output } = req.body
    const resp=await this.configService.updateFlowFormula(fcode,days_output,data.params.id);
    return resp;

  }
  catch(error)
  {
    console.log(error);
    return error;
  }
}

@MessagePattern({cmd:'deleteConfig'})
async deleteConfigFlowFormula(data:{id:any}):Promise<any>
{
try{
  const{id}=data;
  console.log(data);
  const resp=await this.configService.deleteConfigFlowFormula(id);
  return resp;
}
catch(error)
{
   console.log(error);
   return error;
}
}
}







