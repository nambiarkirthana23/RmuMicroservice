import { HttpStatus, Injectable } from '@nestjs/common';
import { State } from '../../device/entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from '../../device/services/common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
    private readonly commonService: CommonService,
  ) {
    // this.updateState({ id: 10, name: 'gujarat', url: '', sid: '' });
   // this.getStateById(10)
  }

  async addStateIfNotExist(name: string): Promise<any> {
    try {
      let query = await this.stateRepository.find({ where: { name } });

      console.log('query', query);

      if (!query) {
        return this.commonService.errorMessage(
          0,
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      } else {
        if (query.length === 0) {
          let query1 = await this.stateRepository.save({ name });
          if (!query1) {
            return this.commonService.errorMessage(
              0,
              CONSTANT_MSG.ADDED_STATE_SUCCESSFULLY,
              HttpStatus.OK,
            );
          } else {
            return this.commonService.successMessage(
              query[0].ref_id,
              CONSTANT_MSG.ADDED_STATE_UNSUCCESSFULLY,
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          return this.commonService.errorMessage(
            query[0].ref_id,
            CONSTANT_MSG.ID_OK,
            HttpStatus.OK,
          );
        }
      }
    } catch (err) {
      return this.commonService.errorMessage(
        0,
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getStates() {
    try {
      let state = await this.stateRepository.find();
      if (!state || state.length === 0) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FETCH_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          state,
          CONSTANT_MSG.FETCH_SUCCESSFULLY,
          HttpStatus.OK,
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

  async addState(name: string, url: string, sid: any) {
    try {
      name = name.toLowerCase();
      let exist = await this.getState(name);
      console.log('exist', exist);
      if (exist.statusCode === HttpStatus.BAD_REQUEST) {
        console.log('enter in if');
        if (exist.data.length === 0) {
          let state = await this.stateRepository.save({ name, url, sid });
          console.log('state', state);
          // if(!state || state.length==0){
          // if (!state || Object.keys(state).length === 0) {
          if (!state || Object.values(exist).every((value) => value === null)) {
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.ADDED_STATE_UNSUCCESSFULLY,
              HttpStatus.BAD_REQUEST,
            );
          } else {
            return this.commonService.successMessage(
              [],
              CONSTANT_MSG.ADDED_STATE_SUCCESSFULLY,
              HttpStatus.CREATED,
            );
          }
        } else {
          return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.STATE_ALREADY_EXIST,
            HttpStatus.CONFLICT,
          );
        }
      } else {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ERROR_SAVING,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateState(body: any) {
    try {
      console.log('body', body);
      console.log('id', body.id);
      let id = body.id;
      let state = await this.stateRepository
        .createQueryBuilder()

        .update(State)
        .set({ name: body.name, url: body.url, sid: body.sid })
        .where('ref_id= :id', { id: id })
        .execute();
      console.log('state', state);
      if (!state) {
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.FAILED_TO_UPDATE_STATE,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return this.commonService.successMessage(
          [],
          CONSTANT_MSG.UPDATE_STATE_SUCCESSFULLY,
          HttpStatus.OK,
        );
      }
      //   return 'got in state service';
    } catch (err) {
      console.log(err);
      return this.commonService.errorMessage(
        [],
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getState(name: string): Promise<any> {
    try {
      console.log('name', name);
      let exist = await this.stateRepository.findOne({ where: { name } });
      //console.log("length",Object.keys(exist).length)
      console.log('exist', exist);
      console.log();
      //   console.log("length",Object.keys(exist).length)
      if (!exist || Object.values(exist).every((value) => value === null)) {
        console.log('enter in not');
        return this.commonService.errorMessage(
          [],
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.BAD_REQUEST,
        );
      } else {
        console.log('id ok');
        return this.commonService.errorMessage(
          exist,
          CONSTANT_MSG.ID_OK,
          HttpStatus.OK,
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

  async getStateById(ref_id:number){
    try{
     let state=await this.stateRepository.findOne({where:{ref_id}})
     console.log(state)
     if(!state ||Object.keys(state).length === 0){
        return this.commonService.errorMessage([],
            CONSTANT_MSG.ID_NOT_FOUND,
            HttpStatus.NOT_FOUND)
     }else{
        return this.commonService.successMessage(state,
            CONSTANT_MSG.ID_OK,
            HttpStatus.OK)
     }

    }catch(err){
        console.log(err)
        return this.commonService.errorMessage([],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR)
        
    }
  }

  async deleteState(ref_id){
    try{
     let resp = await this.stateRepository.delete(ref_id)
     console.log("resp",resp)
     if(!resp ){
        console.log("entr in if")
        return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.ERROR_WHILE_DELETING,
            HttpStatus.BAD_REQUEST
        )
      }else{
        console.log("enter in else")
        return this.commonService.successMessage(
            [],
            CONSTANT_MSG.ID_DELETED_SUCCESSFULLY,
            HttpStatus.NO_CONTENT
        )
      }
    }catch(err){
        console.log("err in ds",err)
        return this.commonService.errorMessage(
            [],
            CONSTANT_MSG.INTERNAL_SERVER_ERR,
            HttpStatus.INTERNAL_SERVER_ERROR
        )

    }
  }
}
