import { HttpStatus, Injectable } from '@nestjs/common';
import { State } from '../entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from './common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';


@Injectable()
export class StateService {
    constructor(
        @InjectRepository(State)
        private readonly stateRepository: Repository<State>,
        private readonly commonService: CommonService

    ) { }

    async addStateIfNotExist(name: string): Promise<any> {
        try {
            let query = await this.stateRepository.find({ where: { name } })

            console.log("query",query)

            if (!query) {
                return this.commonService.errorMessage(
                    0,
                    CONSTANT_MSG.ID_NOT_FOUND,
                    HttpStatus.NOT_FOUND
                )
            }
            else {
                if (query.length === 0) {
                    let query1 = await this.stateRepository.save({name})
                    if (!query1) {
                        return this.commonService.errorMessage(0,
                            CONSTANT_MSG.ADDED_STATE_SUCCESSFULLY,
                            HttpStatus.OK)
                    } else {
                        return this.commonService.successMessage(
                            query[0].ref_id,
                            CONSTANT_MSG.ADDED_STATE_UNSUCCESSFULLY,
                            HttpStatus.BAD_REQUEST
                        )
                    }
                } else {

                    return this.commonService.errorMessage(
                        query[0].ref_id,
                        CONSTANT_MSG.ID_OK,
                        HttpStatus.OK
                    )
                }
            }

        }

    catch(err) {
        return this.commonService.errorMessage(0,
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR)

    }
}
}
