import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { ConfigTable } from 'src/device/entities/config.entity';
import { CommonService } from 'src/device/services/common-service';
import { RidService } from 'src/rid/services/rid.service';
import { Repository } from 'typeorm';
import { Config } from './config.interface';
import { RidConfig } from 'src/device/entities/rid_config.entity';
import { FlowFormula } from 'src/device/entities/flow_formula.entity';
import { Rid } from 'src/device/entities/rid.entity';
//import {Config} from ''

@Injectable()
export class ConfigService {
  constructor(
    private readonly commonService: CommonService,
    @InjectRepository(ConfigTable)
    private readonly configRepository: Repository<ConfigTable>,
    // private readonly ridService: RidService,
    @InjectRepository(FlowFormula)
    private readonly flowFormulaRepository: Repository<FlowFormula>,
 
 
  
    // @InjectRepository(Rid)
    // private readonly ridRepository: Repository<Rid>,
    
  @InjectRepository(Rid)
  private readonly ridService:RidService
  ) {}

  async getConfigs() {
    try {
      let config = await this.configRepository.find();
      if (config.length > 0) {
        return this.commonService.successMessage(
          config,
          CONSTANT_MSG.RETRIEVE_SUCCESSFULLY,
          HttpStatus.OK,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getConfig(ref_id: number) {
    try {
      console.log('ref_id', ref_id);
      let config = await this.configRepository.findOne({ where: { ref_id } });
      if (Object.keys(config).length > 0) {
        return this.commonService.successMessage(
          config,
          CONSTANT_MSG.RETRIEVE_SUCCESSFULLY,
          HttpStatus.OK,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addConfig(body: any) {
    try {
      console.log('body', body);
      let r = await this.ridService.getRIDbyID(body.rid);
      // console.log("r",r)
      // console.log("r",r.data)
      // console.log("length",r.data.length)
      //console.log("l",Object.keys(r).length)
      if (r.statusCode === HttpStatus.OK) {
        // if(r.data.length != 0){
        console.log('enter in ok');
        if (Object.keys(r).length != 0 || r.data.length !== 0) {
          // let r_ref_id = r.resp[0].ref_id;
          let r_ref_id = r.data;
          let rc = await this.ridService.getConfigRidEntry(r_ref_id);
          console.log('rc', rc);
          // console.log("rcstatus",r.statusCode)
          if (rc.statusCode === HttpStatus.OK) {
            // if(rc.data.length!=0){
            console.log('enter');
            // console.log(Object.keys(rc).length)
            // console.log(Object.keys(rc).length !==0)
            if (Object.keys(rc).length !== 0) {
              console.log('update');

              console.log('d', rc.data.config_ref_id);
              let config_ref_id = rc.data.config_ref_id;
              let update_resp = await this.updateConfig(body, config_ref_id);
              if (update_resp.statusCode === HttpStatus.ACCEPTED) {
                return this.commonService.successMessage(
                  [],
                  CONSTANT_MSG.CONFIGURATION_SUCCESS,
                  HttpStatus.OK,
                );
              } else {
                return this.commonService.errorMessage(
                  [],
                  CONSTANT_MSG.FAIL_TO_CONFIGUARTION,
                  HttpStatus.BAD_REQUEST,
                );
              }
            } else {
              console.log('insert');
              // RID_CONFIG RELATION DOES NOT EXIST
              let add_resp = await this.dbAddConfig(body, r_ref_id);
              if (add_resp.statusCode === HttpStatus.ACCEPTED) {
                return this.commonService.successMessage(
                  [],
                  CONSTANT_MSG.CONFIGURATION_SUCCESS,
                  HttpStatus.OK,
                );
              } else {
                return this.commonService.errorMessage(
                  [],
                  CONSTANT_MSG.FAIL_TO_CONFIG,
                  HttpStatus.BAD_REQUEST,
                );
              }
            }
          } else {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.FAIL_TO_CHECK_RID_CONFIG_RELATION,
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.RID_DOES_NOT_EXIST,
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAIL_TO_CHECK_RID_EXIST_OR_NOT,
          HttpStatus.BAD_REQUEST,
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

  async updateConfig(body: any, id: any) {
    try {
      console.log('updateConfig');
      console.log('body', body, 'id', id);
      let mType = body.Motor_type;
      if (mType === 'BLDC') {
        mType = 'B';
      } else if (mType === 'AC') {
        mType = 'A';
      } else if (mType === 'PMSM') {
        mType = 'P';
      } else if (mType === 'PMDC') {
        mType = 'D';
      } else if (mType === 'Special' || mType === 'special') {
        mType = 'S';
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.MOTOR_TYPE_IS_INVALID,
          HttpStatus.BAD_REQUEST,
        );
      }

      body.Motor_type = mType;
      let query = await this.configRepository
        .createQueryBuilder()
        .update(ConfigTable)
        .set({
          name: `${body.FCode}_name`,
          FCODE: body.FCode,
          Motor_type: body.Motor_type,
          PCNTRMODE1: body.PCNTRMODE1,
          PCID: body.CONTROLLER_NO,
          SPCLPREFFREQ1: body.SPCLPREFFREQ1,
          PDCVOC1: body.PDCVOC1,
          PMAXDCV1: body.PMAXDCV1,
          PMAXDCI1: body.PMAXDCI1,
          PDCISC: body.PDCISC,
          PHEAD: body.Rated_Head,
          STINTERVAL: body.STINTERVAL,
          PFREQHSP1: body.PFREQHSP1,
          PMAXFREQ1: body.PMAXFREQ1,
          PFREQLSP1: body.PFREQLSP1,
          POWER0: body.P0,
          POWER1: body.P1,
          POWER2: body.P2,
          POWER3: body.P3,
          POWER4: body.P4,
          POWER5: body.P5,
          FLOW1: body.F1,
          FLOW2: body.F2,
          FLOW3: body.F3,
          FLOW4: body.F4,
          FLOW5: body.F5,
          PMAXFLW1: body.PMAXFLW1,
          PMAXKW1: body.PMAXKW1,
          PREFFREQ1: body.PREFFREQ1,
          Pump_type: body.Pump_type,
          HP: body.HP,
          Panel_wp: body.Panel_wp,
        })
        .where('ref_id = :id', { id })
        .execute();

      console.log('query update', query);

      if (query.affected > 0) {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.CONFIG_UPDATED_SUCCESSFULLY,
          HttpStatus.ACCEPTED,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_WHILE_UPDATING_CONFIG,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async dbAddConfig(body: Config, rid_ref_id: any) {
    try {
      let mType = body.Motor_type;
      if (mType === 'BLDC') {
        mType = 'B';
      } else if (mType === 'AC') {
        mType = 'A';
      } else if (mType === 'PMSM') {
        mType = 'P';
      } else if (mType === 'PMDC') {
        mType = 'D';
      } else if (mType === 'Special' || mType === 'special') {
        mType = 'S';
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.MOTOR_TYPE_IS_INVALID,
          HttpStatus.BAD_REQUEST,
        );
      }

      body.Motor_type = mType;
      let query = this.configRepository.save({
        name: `${body.FCode}_name`,
        FCODE: body.FCode,
        Motor_type: body.Motor_type,
        PCNTRMODE1: body.PCNTRMODE1,
        PCID: body.CONTROLLER_NO,
        SPCLPREFFREQ1: body.SPCLPREFFREQ1,
        PDCVOC1: body.PDCVOC1,
        PMAXDCV1: body.PMAXDCV1,
        PMAXDCI1: body.PMAXDCI1,
        PDCISC: body.PDCISC,
        PHEAD: body.Rated_Head,
        STINTERVAL: body.STINTERVAL,
        PFREQHSP1: body.PFREQHSP1,
        PMAXFREQ1: body.PMAXFREQ1,
        PFREQLSP1: body.PFREQLSP1,
        POWER0: body.P0,
        POWER1: body.P1,
        POWER2: body.P2,
        POWER3: body.P3,
        POWER4: body.P4,
        POWER5: body.P5,
        FLOW1: body.F1,
        FLOW2: body.F2,
        FLOW3: body.F3,
        FLOW4: body.F4,
        FLOW5: body.F5,
        PMAXFLW1: body.PMAXFLW1,
        PMAXKW1: body.PMAXKW1,
        PREFFREQ1: body.PREFFREQ1,
        Pump_type: body.Pump_type,
        HP: body.HP,
        Panel_wp: body.Panel_wp,
      });

      if (!query || Object.keys(query).length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_SAVING,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.CONFIG_SAVED_SUCCESSFULLY,
          HttpStatus.OK,
        );
      }
    } catch (err) {
      console.log('err dbAdd', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteConfig(id: number) {
    try {
      await this.ridService.deleteConfigRidEntry(id);
      let query = await this.configRepository.delete({ ref_id: id });

      console.log('query', query);
      if (query.affected > 0) {
        console.log('affected');
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
          HttpStatus.OK,
        );
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_WHILE_DELETING,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log('err', err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async addFlowFormula(fcode: any, days_output: any) {
    try {

      let f_check = await this.getFlowFormulaByFcode(fcode);
      // console.log("fcheck",f_check)
      if (f_check.statusCode === HttpStatus.OK && f_check.data.length != 0) {
        return this.commonService.errorMessage('',
          CONSTANT_MSG.F_CODE_ALREADY_EXIST,
          HttpStatus.CONFLICT
        )

      }
       
      let query = await this.flowFormulaRepository.save({
        FCODE: fcode,
        do: days_output,
      })

      console.log("query to save", query);

      if (!query) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FLOW_FORMULA_NOT_ADDED,
          HttpStatus.BAD_REQUEST
        )
      } else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.SUCCESSFULLY_FLOW_FORMULA_ADDED,
          HttpStatus.CREATED,

        )
      }


    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  async getFlowFormulaByFcode(fcode: any) {
    try {

      //test it
      let query = await this.flowFormulaRepository.find({ where: { FCODE: fcode } })
      console.log("getFlowFormulaeByFcode", query);
      if (!query) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST
        )
      } else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK
        )
      }
    } catch (err) {
      return this.commonService.errorMessage('',
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }


  async updateFlowFormula(fcode: any, days_output: any, id: any) {
    try {
      //  let query =
      // Use the update method to perform the update in one query
      ///see for id
      const updateResult = await this.flowFormulaRepository.update(id, {
        FCODE: fcode,
        do: days_output,
      });

      console.log(updateResult.affected)

      // Check if the update was successful
      if (updateResult.affected === 0) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FLOW_FORMULA_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      } else {
        return this.commonService.successMessage(
          updateResult,
          CONSTANT_MSG.SUCCESSFULLY_UPDATED,
          HttpStatus.OK
        )
      }

    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.FAILED_TO_GET_FLOW_FORMULA,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
      
  }


  }
  //getFlowFormulas = async () => {
  async getFlowFormulas() {
    try {

      //let query = `SELECT * FROM flow_formula;`;
      let query = await this.flowFormulaRepository.find();
      console.log("get flow formulas query to check", query);
      if (!query) {
        return this.commonService.errorMessage(
          '',
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST
        )
      }
      else {
        return this.commonService.successMessage(
          query,
          CONSTANT_MSG.RETRIEVED_FLOW_FORMULA_DATA,
          HttpStatus.OK
        )

      }


    } catch (err) {
      return this.commonService.errorMessage(
        '',
        CONSTANT_MSG.FAILED_TO_GET_FLOW_FORMULA,
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

   
  //getConfigs = async () => {
    async getConfigsFlowFormula(){
    try {
        
       // let query = `SELECT a.*, b.rid_ref_id as rid FROM config_tbl a INNER JOIN rid_config_tbl b ON a.ref_id = b.config_ref_id;`;
        const query = await this.configRepository
        .createQueryBuilder('a')
        .innerJoin(RidConfig, 'b', 'a.ref_id = b.config_ref_id')
        .addSelect(['b.rid_ref_id AS rid'])
        .getMany();
        //let qresp = await this.db.runQuery(query, []);
         
        if (!query) {
            return this.commonService.errorMessage(
              '',
              CONSTANT_MSG.NOT_ABLE_TO_RETRIVED_CONFIG_DATA_SUCCESSFULLY,
              HttpStatus.BAD_REQUEST
            )
            
        } else {
            return this.commonService.successMessage(
              query,
              CONSTANT_MSG.RETRIVED_CONFIG_DATA_SUCCESSFULLY,
              HttpStatus.OK
            )
        }

    } catch (err) {
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            resp: []
        }
    }
}


// updateConfig = async (params: any, id: any) => {
//   try {

//       let mType = params.Motor_type;
//       if (mType === 'BLDC') {
//           mType = 'B'
//       } else if (mType === 'AC') {
//           mType = 'A'
//       } else if (mType === 'PMSM') {
//           mType = 'P'
//       } else if (mType === 'PMDC') {
//           mType = 'D'
//       } else if (mType === 'Special' || mType === 'special') {
//           mType = 'S'
//       } else {
//           return {
//               status: HttpStatus.BAD_REQUEST,
//               resp: 'Motor_type Type is invalid'
              
//           }
//       }
      
//       params.Motor_type = mType;
      
//     //let query = `UPDATE config_tbl SET name='${params.FCode}_name' ,FCODE = '${params.FCode}', Motor_type='${params.Motor_type}',PCNTRMODE1='${params.PCNTRMODE1}',PCID='${params.CONTROLLER_NO}',SPCLPREFFREQ1='${params.SPCLPREFFREQ1}',PDCVOC1='${params.PDCVOC1}',PMAXDCV1='${params.PMAXDCV1}',PMAXDCI1='${params.PMAXDCI1}',PDCISC='${params.PDCISC}',PHEAD='${params.Rated_Head}', STINTERVAL='${params.STINTERVAL}',PFREQHSP1='${params.PFREQHSP1}',PMAXFREQ1='${params.PMAXFREQ1}',PFREQLSP1='${params.PFREQLSP1}',POWER0='${params.P0}',POWER1='${params.P1}',POWER2='${params.P2}',POWER3='${params.P3}',POWER4='${params.P4}',POWER5='${params.P5}',FLOW1='${params.F1}',FLOW2='${params.F2}',FLOW3='${params.F3}',FLOW4='${params.F4}',FLOW5='${params.F5}',PMAXFLW1='${params.PMAXFLW1}',PMAXKW1='${params.PMAXKW1}',PREFFREQ1='${params.PREFFREQ1}',Pump_type='${params.Pump_type}',HP='${params.HP}',Panel_wp='${params.Panel_wp}' WHERE ref_id = ${id}`;
//     let query = await this.configRepository
//     .createQueryBuilder()
//     .update('config_tbl')
//     .set({
//       FCODE:params.FCODE,
//       Motor_type:params.Motor_type,
//       PCNTRMODE1:params.pcntrmode1,
//       PCID:params.PCID,
//       SPCLPREFFREQ1:params.SPCLPREFFREQ1,
//       PDCVOC1:params.PDCVOC1,
//       PMAXDCV1:params.PMAXDCV1,
//       PMAXDCI1:params.PMAXDCI1,
//       PDCISC:params.PDCISC,
//       PHEAD:params.PHEAD, 
//       STINTERVAL:params.STINTERVAL,
//       PFREQHSP1:params.PFREQHSP1,
//       PMAXFREQ1:params.PMAXFREQ1,
//       PFREQLSP1:params.PFREQLSP1,
//       POWER0:params.P0,
//       POWER1:params.P1,
//       POWER2:params.P2,
//       POWER3:params.P3,
//       POWER4:params.P4,
//       POWER5:params.P5,
//       FLOW1:params.F1,
//       FLOW2:params.F2,
//       FLOW3:params.F3,
//       FLOW4:params.F4,
//       FLOW5:params.F5,
//       PMAXFLW1:params.PMAXFLW1,
//       PMAXKW1:params.PMAXKW1,
//       PREFFREQ1:params.PREFFREQ1,
//       Pump_type:params.Pump_type,
//       HP:params.HP,
//       Panel_wp:params.Panel_wp  
//       //  WHERE ref_id = ${id}`;


     
//     })
//     .where('ref_id = :id', { id: id })
//     .execute();
//    // let qresp = await this.db.runQuery(query, []);
//       // console.log('Config ',qresp)
//       if (!query) {
//           // return {
//           //     status: HttpStatus.ACCEPTED,
//           // }
//           return this.commonService.errorMessage(
//             '',
//             CONSTANT_MSG.NOT_ABLE_TO_UPDATE_CONFIG_DATA_SUCCESSFULLY,
//             HttpStatus.BAD_REQUEST
//           )
          
//       } else {
//           // return {
//           //     status: HttpStatus.BAD_REQUEST,
//           //     resp: ''

//           // }
//           return this.commonService.successMessage(
//             query,
//             CONSTANT_MSG.ABLE_TO_UPDATE_CONFIG_DATA_SUCCESSFULLY,
//             HttpStatus.ACCEPTED
//           )
//       }
//   } catch (err) {
    
//           // status: HttpStatus.INTERNAL_SERVER_ERROR,
//           // resp: ''

//           return this.commonService.errorMessage(
//             '',
//             CONSTANT_MSG.NOT_ABLE_TO_UPDATE_CONFIG_DATA_SUCCESSFULLY,
//             HttpStatus.INTERNAL_SERVER_ERROR

//           )
//       }
//   }


  deleteConfigFlowFormula = async (id: any) => {
    try {

       await this.ridService.deleteConfigRidEntry(id);
        let query = `DELETE FROM config_tbl where ref_id = ${id};`;
        //let qresp = await this.db.runQuery(query, []);
        if (query) {
            return {
                status: HttpStatus.NO_CONTENT,
            }
        } else {
            return {
                status: HttpStatus.BAD_REQUEST,
            }
        }

    } catch (err) {
        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        }
    }
}
 

}



 


  
