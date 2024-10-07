import { HttpStatus, Injectable } from '@nestjs/common';
import { State } from '../entities/state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommonService } from './common-service';
import { CONSTANT_MSG } from 'src/common-dto/const';
import { Vendor } from '../entities/vendor.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository:Repository<State>,
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly commonService: CommonService,
  ) { 
     //this.addVendorStateIfNotExist('pci_wires',11)
   // this.addVendorStateIfNotExist('solex',2)
  }
 

  async addVendorStateIfNotExist(name: string, state_id: number): Promise<any> {
    try {
   

      // let vendor = await this.vendorRepository.find({where:{
      //   name,
      //   state:state_id
      // }})
      let vendor = await this.vendorRepository.find({
        where: {
          name,
          state: { ref_id: state_id }
        }
      });

      console.log("vendors",vendor)

      if (!vendor) {
        return this.commonService.errorMessage(
          0,
          CONSTANT_MSG.ID_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      } else {
        if (vendor.length === 0) {
          
          // let vendor1 = await this.vendorRepository.save({name, state_id});
          let newState = await this.stateRepository.findOne({where:{ref_id: state_id }}); 
          let vendor1 = await this.vendorRepository.save({ name, state: newState });
          
          console.log("vendor1",vendor1)
          console.log("vendor_ref_id",vendor1.ref_id)
          if (!vendor1) {
            return this.commonService.errorMessage(
              0,
              CONSTANT_MSG.VENDOR_SAVED_UNSUCCESSFULLY,
              HttpStatus.BAD_REQUEST,
            );
          } else {
           // console.log("vendor_ref_id",vendor1[0].ref_id)
            return this.commonService.successMessage(
              vendor1,
              CONSTANT_MSG.VENDOR_SAVED_SUCCESSFULLY,
              HttpStatus.OK,
            );
          }
        } else {
          //  console.log(vendor[0].ref_id)
           console.log(vendor[0])
          return this.commonService.successMessage(
            
            vendor[0],
            CONSTANT_MSG.FETCH_SUCCESSFULLY,
            HttpStatus.OK,
          );
        }
      }
    } catch (err) {
      console.log("ven err",err)
        return this.commonService.errorMessage(0,
        CONSTANT_MSG.INTERNAL_SERVER_ERR,
        HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
