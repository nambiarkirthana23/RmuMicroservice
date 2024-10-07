import { Post, HttpStatus, Body, Res, Controller, Get, Param, Delete, Put } from "@nestjs/common";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { CONSTANT_MSG } from "src/common-dto/const";
import { AgencyDto } from "src/masters/agency_master/dtos/agency.dto";
import { GatewayFarmerService } from "../service/farmers.service";

@Controller('projectDetail')
export class GatewayFarmerController
{
    constructor(private readonly farmerService:GatewayFarmerService){}
  @Post('/add')
 @ApiBody({ type: AgencyDto }) 
  @ApiResponse({ status: HttpStatus.CREATED, description: 'project details added successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async addProjectDetails(@Body() body: any, @Res() res: any,) {
    try {
      console.log("body ",body);
      let resp = await this.farmerService.addProject(body);

      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({ success: resp.message });
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }


  @Get('/projectDetails') 
  @ApiResponse({ status: HttpStatus.CREATED, description: 'project details retrieved successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async GetProjectDetails( @Res() res: any,) {
    try {
    
      let resp = await this.farmerService.getProjectDetails();

      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res.status(resp.statusCode).send({ success: resp.message,data:resp.data });
      } else {
        res.status(resp.statusCode).send({ error: resp.message});
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Delete('/projectDetails') 
  @ApiResponse({ status: HttpStatus.CREATED, description: 'project details deleted  successfully' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Internal server error' })
  async updateProjectDetails(@Param('id')id:number,@Body() body:any, @Res() res: any,) {
    try {
    
      let resp = await this.farmerService.updateProjectDetails(id,body);

      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res.status(resp.statusCode).send({ success: resp.message });
      } else {
        res.status(resp.statusCode).send({ error: resp.message});
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }


  @Put('update/:id') 

  async UpdateProjectDetails(@Param('id')id:number,@Body() body:any ,@Res() res: any,) {
    try {
    
      console.log("id",id);
      console.log("body",body);
      let resp = await this.farmerService.updateProjectDetails(id,body);

      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.ACCEPTED) {
        res.status(resp.statusCode).send({ success: resp.message});
      } else {
        res.status(resp.statusCode).send({ error: resp.message});
      }
    } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }

    
  }

  



}