import {Controller, Get,HttpStatus,Param,Post,Req,Res,} from '@nestjs/common';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { RidService } from '../services/rid.service';

@Controller()
export class RIDController {
  constructor(private readonly ridService: RidService) {}

//   @Post('addRid')
//   async addRID(@Req() req: any, @Res() res: any) {
//     const { rid, CONT_MFR } = req.body;
//     try {
//       let resp = await this.ridService.addRID(rid, CONT_MFR);
//       console.log('rid  add resp ', resp);
//       // res.status(resp.status).send(resp);
//       if (resp.code == 'ECONNREFUSED') {
//         res
//           .status(HttpStatus.INTERNAL_SERVER_ERROR)
//           .send({ error: 'Device MicroService ECONNREFUSED' });
//       } else if (resp.statusCode === HttpStatus.OK) {
//         // console.log("td", resp)
//         res
//           .status(resp.statusCode)
//           .send({ success: resp.message, data: resp.data });
//       } else {
//         res.status(resp.statusCode).send({ error: resp.message });
//       }
//     } catch (err) {
//       // console.error("c", err)

//       res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
//         message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
//         statusCode: false,
//       });
//     }
//   }

//   @Get('all/:rid_ref_id')
//   async getAllConfig(@Res() res: any, @Param('rid_ref_id') rid_ref_id: number) {
//     try {
//       console.log('gw', rid_ref_id);
//       let config = await this.ridService.getConfig(rid_ref_id);
//       if (config.code == 'ECONNREFUSED') {
//         res
//           .status(HttpStatus.INTERNAL_SERVER_ERROR)
//           .send({ error: 'config MicroService ECONNREFUSED' });
//       } else if (config.statusCode === HttpStatus.OK) {
//         // console.log("td", config)
//         res
//           .status(config.statusCode)
//           .send({ success: config.message, data: config.data });
//       } else {
//         res.status(config.statusCode).send({ error: config.message });
//       }
//     } catch (err) {
//       // console.error("c", err)

//       res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
//         message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
//         statusCode: false,
//       });
//     }
//   }
}
