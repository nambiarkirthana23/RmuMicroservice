import { HttpStatus, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "./user.dto";
import { CommonService } from "src/common-service/common-service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { JwtService } from '@nestjs/jwt';
import { UserPermissionDto } from "./permission.dto";
import { JwtPayload } from "./jwtpayload.interface";
import { ConfigService } from "@nestjs/config";

export class UserService{
    constructor(
      private readonly commonService:CommonService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService,
        @Inject('DEVICE_SERVICE')
        private readonly deviceProxy: ClientProxy,

      ) {}
    
      async addUser(body:UserDto) {
        try {
        
          let resp = await this.deviceProxy.send({ cmd: 'addUser' }, body).toPromise()
          return resp;
        } catch (err) {
            return err;
        }
      }


      async getAllUser() {
        try {
          let resp = await this.deviceProxy.send({ cmd: 'getAllUser' },'').toPromise()
          return resp;
        } catch (err) {
            return err;
        }
      }

      async getUserById(id:number)
      {
        try
        {
            
        let resp=await this.deviceProxy.send({cmd:'getUserById'},id).toPromise();
        return resp;

      }
        catch(error)
        {
          console.log(error);
          return error;
        }
      }


      async updateUser(id:number,body:any) {
        try {
          let resp = await this.deviceProxy.send({ cmd: 'updateUser' },{id,body}).toPromise()
          return resp;
        } catch (err) {
            return err;
        }
      }

      async deleteUser(id:number)
      {
        try{
          console.log("user service",id);
        let resp=await this.deviceProxy.send({cmd:'deleteUser'},id).toPromise();
        return resp;
        }
        catch(error)
        {
          console.log(error);
          return error;
        }
      }


     


      async addUserPermission(body:UserPermissionDto) {
        try {
        
          let resp = await this.deviceProxy.send({ cmd: 'addUserPermission' }, body).toPromise()
          return resp;
        } catch (err) {
            return err;
        }
      }


      // async signIn(userDto: { email: string; password: string }) {
      //   const { email, password } = userDto;
    
      //   try {
    
      //     const response = await this.deviceProxy.send({ cmd: 'signIn' }, { email, password }).toPromise();
      //     console.log("gw data ", response)
         
      //     if (response && response.statusCode === HttpStatus.OK) {
      //       let jwtPl = {
      //         username: email,
      //         role: response.data.user.role,
    
      //       }
    
      //       let rids = response.data.user_rids.data;
      //       console.log("permm", response.data.permm)
      
      //       console.log("permission", response.data.per == 0 ? [] : response.data.per[0]);
                
      //       let permission = response.data.per == 0 ? [] : response.data.per[0]
              
            
      //       console.log(response.role, "role", response.data.user.role)
    
      //       const token = this.generateToken(jwtPl);
      //       console.log("token:", token)
      //       return this.commonService.successMessage(
      //         {
      //           access_token: token, 
      //           // rids: rids, permission: permission, expiresIn: this.configService.get('JWT_EXPIRES_IN')
      //         },
      //         CONSTANT_MSG.TOKEN_GENERATED_SUCCESSFULLY,
      //         HttpStatus.OK
      //       )
      //       // return { access_token: token };
      //     } else {
      //       console.log("enter in err", response.message, response.statusCode)
      //       return this.commonService.errorMessage(
      //         [],
      //         CONSTANT_MSG.INVALID_CREDENTIALS,
      //         // HttpStatus.UNAUTHORIZED
      //         // response.message,
      //         response.statusCode
      //       )
    
      //     }
      //   } catch (err) {
      //     console.log("err", err)
    
      //     return err;
      //     // return this.commonService.errorMessage(
      //     //     [],
      //     //     CONSTANT_MSG.INTERNAL_SERVER_ERR,
      //     //     HttpStatus.INTERNAL_SERVER_ERROR,
      //     //   );
      //   }
      // }
    
      // generateToken(payload: { username: string, role: string }): string {
      //   try {
    
      //     return this.jwtService.sign(payload);
      //   } catch (err) {
      //     console.log(err)
      //     return err
      //   }
      // }



      async signIn(userDto: { email: string; password: string }) {
        const { email, password } = userDto;
    
        try {
    
          const response = await this.deviceProxy.send({ cmd: 'login' }, { email, password }).toPromise();
          console.log("gw data ", response)
          // console.log("response", response.data.user_rids)
          // console.log('permission', response.data.permission)
    
          
           
          if (response && response.statusCode === HttpStatus.OK) {
            let jwtPl = {
              username: email,
              role: response.data.user.role,
    
            }
    
            let rids = response.data.user_rids.data;
            console.log("per", response.data.permission1)
      
            console.log("permission", response.data.permission1 == 0 ? [] : response.data.permission1[0]);
                
            let permission = response.data.permission1 == 0 ? [] : response.data.permission1[0]
            
            console.log(response.role, "role", response.data.user.role)
            console.log("expires", this.configService.get('JWT_EXPIRES_IN'))
            const token = this.generateToken(jwtPl);
            console.log("token:", token)
            return this.commonService.successMessage(
              {
                access_token: token, rids: rids, permission: permission, expiresIn: this.configService.get('JWT_EXPIRES_IN')
              },
              CONSTANT_MSG.TOKEN_GENERATED_SUCCESSFULLY,
              HttpStatus.OK
            )
            // return { access_token: token };
          } else {
            console.log("enter in err", response.message, response.statusCode)
            return this.commonService.errorMessage(
              [],
              CONSTANT_MSG.INVALID_CREDENTIALS,
              // HttpStatus.UNAUTHORIZED
              // response.message,
              response.statusCode
            )
    
          }
        } catch (err) {
          console.log("err", err)
    
          return err;
          // return this.commonService.errorMessage(
          //     [],
          //     CONSTANT_MSG.INTERNAL_SERVER_ERR,
          //     HttpStatus.INTERNAL_SERVER_ERROR,
          //   );
        }
      }
    
      generateToken(payload: { username: string, role: string }): string {
        try {
    
          return this.jwtService.sign(payload);
        } catch (err) {
          console.log(err)
          return err
        }
      }
    


      async getUserPermission(id:number) {
        try {
        
          let resp = await this.deviceProxy.send({ cmd: 'getUserPermission' }, id).toPromise()
          return resp;
        } catch (err) {
            return err;
        }
      }


      



    

}