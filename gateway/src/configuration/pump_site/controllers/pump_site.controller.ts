import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from "@nestjs/common";
import { PumpSiteService } from "../services/pump_site.service";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { CONSTANT_MSG } from "src/common-dto/const";
import { AgencyDto } from "src/masters/agency_master/dtos/agency.dto";
@Controller('pumpSite')
export class PumpSiteController{
    constructor(private readonly pumpSiteService:PumpSiteService){}
    @Post('/add')
    @ApiBody({ type: AgencyDto }) 
     @ApiResponse({ status: HttpStatus.CREATED, description: 'pump site added successfully' })
     @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
     async addPumpSite(@Body() body: any, @Res() res: any,) {
       try {
         console.log("body ",body);
         let resp = await this.pumpSiteService.addPumpSiteDetails(body);
   
         if (resp.code === 'ECONNREFUSED') {
           res
             .status(HttpStatus.INTERNAL_SERVER_ERROR)
             .send({ error: 'Device Microservice ECONNREFUSED' });
         } else if (resp.statusCode === HttpStatus.CREATED) {
           res.status(resp.statusCode).send({ success: resp.message ,});
         } else {
           res.status(resp.statusCode).send({ error: resp.message });
         }
       } catch (error) {
        console.log(error);
         res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
           message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
           statusCode: false,
         });
       }
     }

    @Get('/pumpSites')
     async getAllPumpSite(@Res() res: any,) {
        try {
          
          let resp = await this.pumpSiteService.getAllPumpSite();
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.OK) {
            res.status(resp.statusCode).send({ success: resp.message ,data:resp.data});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }
    }

   @Get('/:id')
     async getPumpSiteById(@Param('id')id:number,@Res() res: any,) {
        try {
          
          let resp = await this.pumpSiteService.getPumpSiteById(id);
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.OK) {
            res.status(resp.statusCode).send({ success: resp.message ,data:resp.data});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }
      }

     @Delete('delete/:id')
      async DeletePumpSite(@Param('id')id:number,@Res() res: any,) {
        try {
          
          let resp = await this.pumpSiteService.deletePumpSite(id);
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.ACCEPTED) {
            res.status(resp.statusCode).send({ success: resp.message ,data:resp.data});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }
      }

  @Put('update/:id')
      async updatePumpSite(@Param('id')id:number,@Body() body:any,@Res() res: any,) {
        try {
          
          let resp = await this.pumpSiteService.updatePumpSite(id,body);
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.ACCEPTED) {
            res.status(resp.statusCode).send({ success: resp.message});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }
      }






    


    
   
    
}