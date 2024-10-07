import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res } from "@nestjs/common";
import { ConfigService } from "./config.service";
import { CONSTANT_MSG } from "src/common-dto/const";

@Controller('config')
export class ConfigController{
    constructor(
        private readonly configService:ConfigService
    ){ }

    @Get('configs')
    async getConfigs(@Res() res: any){
        try{
          console.log("get")
            let resp = await this.configService.getConfigs()
            if (resp.code == 'ECONNREFUSED') {
                res
                  .status(HttpStatus.INTERNAL_SERVER_ERROR)
                  .send({ error: 'Device Microservice ECONNREFUSED' });
              } else if (resp.statusCode === HttpStatus.OK) {
                res
                  .status(resp.statusCode)
                  .send({ success: resp.message, data: resp.data });
              } else {
                res.status(resp.statusCode).send({ error: resp.message });
              }

        }catch(err){
            console.log("err",err)
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
                statusCode: false,
              });
            
        }
    }
 
    @Get('/:ref_id')
    async getConfig(@Res() res:any,@Param('ref_id') ref_id:number){
      try{
        console.log("ref_id",ref_id)
      let resp = await this.configService.getConfig(ref_id)
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      

      }
    }
//ridtbl
    @Post('add')
    async addConfig(@Req() req:any,@Res() res:any,@Body() body:any){
      try{
        console.log("gw",body)
      let resp = await this.configService.addConfig(body);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }
  
    // @Put('update/:id')
    // async updateConfig(@Req() req:any,@Res() res:any,@Param('id') id:any,@Body() body:any){
    //   try{
    //    console.log("gw",body,id)
    //    let resp = await this.configService.updateConfig(body,id);
    //    if (resp.code == 'ECONNREFUSED') {
    //     res
    //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
    //       .send({ error: 'Device Microservice ECONNREFUSED' });
    //   } else if (resp.statusCode === HttpStatus.OK) {
    //     res
    //       .status(resp.statusCode)
    //       .send({ success: resp.message, data: resp.data });
    //   } else {
    //     res.status(resp.statusCode).send({ error: resp.message });
    //   }
    //   }catch(err){
    //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
    //       message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
    //       statusCode: false,
    //     });
    //   }
    // }

    @Delete('delete/:id')
    async deleteConfig(@Req() req:any,@Res() res:any,@Param('id') id:any){
      try{
       console.log("id",id)
       let resp = await this.configService.deleteConfig(id);
       if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ success: resp.message});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
      }catch(err){
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
          message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
          statusCode: false,
        });
      }
    }


    @Post('add/flowformula')
    async addFlowFormula(@Req() req: any, @Res() res: any) {
        try {
            let params: any = req.body;
            const { FCODE, days_output } = req.body;
            console.log(params);
            let resp = await this.configService.addFlowFormula(FCODE, days_output);
            console.log("resp to checking", resp);
            if (resp.code == 'ECONNREFUSED') {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send({ error: 'config Microservice ECONNREFUSED' })
            }
            else {
                console.log(resp.statusCode, resp.message);
                res.status(resp.statusCode).send({ message: resp.message })
            }
        }
        catch (error) {
            console.log(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
                message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
                statusCode: false,
              });
            }

        }
    

    @Get('configs/flowformula')
    async getFlowFormula(@Req() req: any, @Res() res: any) {
        try {
            let resp = await this.configService.getFlowFormula();
            console.log("get flow formula", resp)
            if (resp.code == 'ECONNNREFUSED') {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send({ error: 'config Microservice ECONNREFUSED' })
            }
            else {
                console.log(resp.statusCode, resp.message);
                res.status(resp.statusCode).send({ message: resp.message, data: resp.data })
            }

        }
        catch (error) {
            console.log(error);
            return error;
        }

    }

    
    @Get('/configurations/:imei')
    async getDeviceConfigFlowFormula(@Param() param: any, @Req() req: any, @Res() res: any) {
        let resp = await this.configService.getDeviceConfig(param.imei);
        // console.log(resp);
        if (resp.code == 'ECONNREFUSED') {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .send({ error: 'config Microservice ECONNREFUSED' })
        }
        else {
            res.status(resp.statusCode).send({ message: resp.message, data: resp.data })
        }
        // if (resp.status == 200) {
        //     res.status(resp.status).send(resp.resp)
        // } else if (resp.status == 404) {
        //     res.status(resp.status).send(resp)
        // } else {
        //     res.status(resp.status).send(resp)
        // }


    }



    @Get('/config')
    async getConfigsFlowFormula(@Req() req: any, @Res() res: any) {
        try {
            let resp = await this.configService.getConfigsFlowFormula();
            if (resp.code == 'ECONNREFUSED') {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .send({ error: 'config Microservice ECONNREFUSED' })
            }
            else {
                res.status(resp.statusCode).send({ message: resp.message, data: resp.data })
            }
        }
        catch (error) {
            console.log(error);
            return error
        }
    }

    @Put('flowformula/:id')
    async updateConfigFlowFormula(@Param() param:any,@Req() req: any, @Res() res: any) {
      console.log("param",param);
        let params: any = req.body;
        const id = req.query.id;
        let resp = await this.configService.updateConfigFlowFormula(param.id, id);
        console.log("response of flow foemula",resp);
        res.status(resp.status).send(resp);
         
    }
       
   
    @Delete('/config/:id')
    async deleteConfigFlowFormula(@Param() param: any, @Req() req: any, @Res() res: any) {
        console.log(param)
        let resp = await this.configService.deleteConfigFlowFormula(param.id);
        res.status(resp.status).send(resp);
    }



    





}



