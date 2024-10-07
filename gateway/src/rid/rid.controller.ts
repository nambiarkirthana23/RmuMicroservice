import {Controller, Delete, Get,HttpStatus,Param,Post,Put,Req,Res,} from '@nestjs/common';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { RidService } from './rid.service';

@Controller('rid')
export class RIDController {
  constructor(private readonly ridService: RidService) {
    // this.getRids()
  }

  @Post('add')
  async addRID(@Req() req: any, @Res() res: any) {
    const { rid, CONT_MFR } = req.body;
    try {
      let resp = await this.ridService.addRID(rid, CONT_MFR);
      console.log('rid  add resp ', resp);
      // res.status(resp.status).send(resp);
      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device MicroService ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        // console.log("td", resp)
        res
          .status(resp.statusCode)
          .send({ success: resp.message});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
    } catch (err) {
      // console.error("c", err)

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

  @Get('/:rid_ref_id')
  async getAllConfig(@Res() res: any, @Param('rid_ref_id') rid_ref_id: number) {
    try {
      console.log('gw', rid_ref_id);
      let config = await this.ridService.getConfig(rid_ref_id);
      if (config.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'config MicroService ECONNREFUSED' });
      } else if (config.statusCode === HttpStatus.OK) {
        // console.log("td", config)
        res
          .status(config.statusCode)
          .send({ success: config.message, data: config.data });
      } else {
        res.status(config.statusCode).send({ error: config.message });
      }
    } catch (err) {
      // console.error("c", err)

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }


  @Get('/:id')
  async getRid(@Param() param:any,@Res() res:any){
    try{
      // console.log("enter in get by id")
    let resp = await this.ridService.getRIDByRefID(param.id);
    if(resp.code == 'ECONNREFUSED'){
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({error:'Device Microservice ECONNREFUSED'
        })
    } else if(resp.statusCode === HttpStatus.OK){
      res
      .status(resp.statusCode)
      .send({success:resp.message,data:resp.data})
    }else{
    res.status(resp.statusCode).send({error:resp.message});
    }
  }catch(err){
    console.log(err)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message:CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode:false,
    })
  }
}

 @Delete('/:id')
 async deleteRid(@Param() param:any, @Req() req:any, @Res() res:any){
  try{
  console.log(param)
  let resp= await this.ridService.deleteRid(param.id)
  if(resp.code == 'ECONNREFUSED'){
    res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
    .send({error:'Device Microservice ECONNRFUSED'})

  } else if(resp.statusCode == HttpStatus.NO_CONTENT){
    res
      .status(resp.statusCode)
      .send({success:resp.message})
  }else{
    res.status(res.statusCode).send({error:resp.message});
  }
  
  }catch(err){
    console.log(err)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message:CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode:false,
    })
  }
 }


 @Put('')
 async updateRid(@Req() req:any,@Res() res:any){
  try{
   let params:any = req.body;
   const id = req.query.id;
   console.log(req.body)
   console.log(id)

   let resp = await this.ridService.updateRid(params,id)
   console.log("resp",resp)
   if(resp.code == 'ECONNREFUSED'){
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .send({error:'Device Microservice ECONNREFUSED'})
   }else if(resp.statusCode == HttpStatus.ACCEPTED){
    res
      .status(resp.statusCode)
      .send({success:resp.message})
   } else{
    res.status(res.statusCode).send({error:resp.message})
   }
   //console.log(resp)
  }catch(err){
    console.log(err)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message:CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statuscode:false
    })
  }
 }


 @Get('')
 async getallRids(@Req() req:any ,@Res() res:any){
  try{
  
   let resp = await this.ridService.getallRids();
   console.log("gwc",resp)
   if(resp.code == 'ECONNREFUSED'){
    res
    .status(HttpStatus.INTERNAL_SERVER_ERROR)
     .send({error:'Device in all  Microservice ECONNREFUSED'})
   }else if(resp.statusCode == HttpStatus.OK){
  // res.status(resp.statusCode).send(resp.data)
   res
    .status(resp.statusCode)
    .send({success:resp.message,data:resp.data})
   } else{
    res.status(res.statusCode).send({error:resp.message})
   }
  }catch(err){
    console.log(err)
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message:CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode:false
    })
  
  }
 }

}
