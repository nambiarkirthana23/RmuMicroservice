import { InjectRepository } from "@nestjs/typeorm";
import { FarmerProjectDetails } from "../entities/farmer.entity";
import { CommonService } from "src/device/services/common-service";

import { Repository } from "typeorm";
import { HttpStatus } from "@nestjs/common";
import { CONSTANT_MSG } from "src/common-dto/const";

export class FarmerService {
    constructor(
        @InjectRepository(FarmerProjectDetails)
        private readonly farmerRepository: Repository<FarmerProjectDetails>,
        private readonly commonService: CommonService,
    ) { }

    async addProjectDetail(body: any) {
        try {
            let exist = await this.getFarmerByRid(body.rid);
            console.log(exist);
            if (exist.statusCode === HttpStatus.OK) {
                return this.commonService.errorMessage(
                    [],
                    CONSTANT_MSG.ID_EXIST,
                    HttpStatus.CONFLICT,
                );
            } else {
                let resp = await this.farmerRepository.save(body);
                console.log('resp', resp);
                if (!resp) {
                    return this.commonService.errorMessage(
                        [],
                        CONSTANT_MSG.UNABLE_TO_ADD,
                        HttpStatus.BAD_REQUEST,
                    );
                } else {
                    return this.commonService.successMessage(
                        resp,
                        CONSTANT_MSG.FARMER_ADDED_SUCCESSFULLY,
                        HttpStatus.CREATED,
                    );
                }
            }
        }
        catch (err) {
            console.log('err', err);
            return this.commonService.errorMessage(
                {},
                CONSTANT_MSG.INTERNAL_SERVER_ERR,
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async getFarmerByRid(rid: string) {
        try {
            console.log("rid");
            let exist = await this.farmerRepository.findOne({ where: { rid } });
            console.log("exist", exist);
            if (!exist) {
                return this.commonService.errorMessage(
                    [],
                    CONSTANT_MSG.FETCH_ERROR,
                    HttpStatus.BAD_REQUEST,
                );
            } else {
                return this.commonService.successMessage(
                    [],
                    CONSTANT_MSG.FETCH_SUCCESSFULLY,
                    HttpStatus.OK,
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


    async getProjectDetails() {
        try {
            let resp = await this.farmerRepository.find();
            if (!resp) {
                return this.commonService.errorMessage('', CONSTANT_MSG.NOT_ABLE_TO_GET_PROJECT_DETAILS, HttpStatus.BAD_REQUEST)
            }
            else {
                return this.commonService.successMessage(resp, CONSTANT_MSG.RETRIEVED_PROJECT_DETAILS_SUCCESSFULLY, HttpStatus.OK)
            }
        }
        catch (error) {
            console.log(error);
            return this.commonService.errorMessage('', CONSTANT_MSG.INTERNAL_SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async updateProjectDetails(data:{id: number,body: any}) {
        try {
            const{id,body}=data;
            console.log("update service id",id);
            console.log("update service body",body);
            let ref_id = await this.farmerRepository.find({ where: { ref_id: id } });
            console.log("ref_id",ref_id);
            if(!ref_id)
            {
                return this.commonService.errorMessage('',CONSTANT_MSG.ID_NOT_FOUND,HttpStatus.NOT_FOUND)
            }
            let UpdateProjectDetails = await this.farmerRepository.update(
                { ref_id: id },
                body
            );
            if (!UpdateProjectDetails) {
                return this.commonService.errorMessage('', CONSTANT_MSG.UPDATED_PROJECT_DETAILS_SUCCESSFULLY, HttpStatus.BAD_REQUEST)
            }
            else {
                return this.commonService.successMessage(UpdateProjectDetails, CONSTANT_MSG.UPDATED_PROJECT_DETAILS_SUCCESSFULLY, HttpStatus.INTERNAL_SERVER_ERROR)
            }
        }
        catch(error)
        {
            console.log(error);
            return this.commonService.errorMessage('',CONSTANT_MSG.INTERNAL_SERVER_ERR,CONSTANT_MSG.INTERNAL_SERVER_ERR)
        }


        
      }

    async deleteProjectDetails(id: number) {
        try {
            let idToDelete = await this.farmerRepository.findOne({ where: { ref_id: id } });
            if (idToDelete) {
                return this.commonService.errorMessage('', CONSTANT_MSG.ID_NOT_FOUND, HttpStatus.NOT_FOUND);
            }
            let deleteData = await this.farmerRepository.delete(idToDelete);
            if (!deleteData) {
                return this.commonService.errorMessage('', CONSTANT_MSG.NOT_ABLE_TO_GET_PROJECT_DETAILS, HttpStatus.BAD_REQUEST)
            }
            else {
                return this.commonService.successMessage(deleteData, CONSTANT_MSG.RETRIEVED_PROJECT_DETAILS_SUCCESSFULLY, HttpStatus.OK)
            }
        }
        catch (error) {
            console.log(error);
            return this.commonService.errorMessage('', CONSTANT_MSG.INTERNAL_SERVER_ERR, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}