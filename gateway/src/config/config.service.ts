import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class ConfigService {
  constructor(
    @Inject('DEVICE_SERVICE')
    private readonly deviceProxy: ClientProxy
  ) {}

  async getConfigs() {
    try {
      console.log("gwservice");
      let resp = await this.deviceProxy.send({ cmd: 'getConfigs' }, '').toPromise();
      return resp;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async getConfig(ref_id:number){
    try{
        console.log("ref_id",ref_id)
     let resp = await this.deviceProxy.send({cmd:'getConfig'},ref_id).toPromise()
     return resp;
    }catch(err){
        console.log("err",err)
        return err;
    }
  }

  async addConfig(body:any){
    try{
      console.log("body",body)
     let resp = await this.deviceProxy.send({cmd:'addConfig'},body).toPromise()
     return resp;
    }catch(err){
      console.log("err",err)
      return err;
    }
  }

  // async updateConfig(body:any,id:number){
  //   try{
  //    console.log("body",body)
  //    let resp =await this.deviceProxy.send({cmd:'updateConfig'},{body,id}).toPromise()
  //    return resp;
  //   }catch(err){
  //     console.log("err",err)
  //     return err;
  //   }
  // }

  async deleteConfig(id:number){
    try{
    let resp = await this.deviceProxy.send({cmd:'deleteConfig'},id).toPromise()
    return resp;
    }catch(err){
      console.log("err",err)
      return err;
    }
  }


  async addFlowFormula(fcode:any, days_output:any):Promise<any>
  {
    try{
       const device=await this.deviceProxy.send({cmd:'configDevice'},{fcode,days_output}).toPromise();
       console.log("addFlowFormula",device);
       return device;
  }
  catch(error)
  {
    console.log(error);
    return error;
  }
}


async getFlowFormula():Promise<any>
{
   try{
    const resp=await this.deviceProxy.send({cmd:'getFlowFormula'},{}).toPromise();
    console.log("get flow formula",resp);
    return resp;
   }
   catch(error)
   {
    console.log(error);
    return error;
   }
}

async getDeviceConfig(imei: any):Promise<any>
{
  try{
    const resp=await this.deviceProxy.send({cmd:'getDeviceConfig'},{imei});
    return resp;
  }
  catch(error)
  {
   console.log(error);
   return error;
  }
}

async getConfigsFlowFormula():Promise<any>
{
  try{
     const resp=await this.deviceProxy.send({cmd:'getConfigs'},{}).toPromise();
     console.log("gateway get config",resp)
     return resp;
  }
  catch(error)
  {
    console.log(error);
    return error;
  }
}


async updateConfigFlowFormula(params: any, id: any):Promise<any>
{
  try{
   const resp=await this.deviceProxy.send({cmd:'updateConfigflowf'},{params,id}).toPromise();
   console.log(resp);
   return resp;
  }
  catch(error)
  {
    console.log(error)
    return error
  }
}

 async deleteConfigFlowFormula(id:any):Promise<any>
 {
  try{
    const resp=await this.deviceProxy.send({cmd:'deleteConfig'},{id}).toPromise();
    return resp;
  }
  catch(error)
  {
    console.log(error);
    return error;
  }
 }








}
