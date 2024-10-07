import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";
import { UserPermissionDto } from "./permission.dto";

@Controller()
export class UserController{
    constructor(
        private readonly userService:UserService,
    ){}

    @MessagePattern({cmd:'addUser'})
    async addUser(body:UserDto){
        try{
        //const{role,email,password,name,mobile,agency,department}=body;
        let resp = await this.userService.addUser(body);
        return resp;
        }catch(err){
         console.log("err",err);
         return err;
        }
    }


    @MessagePattern({cmd:'getAllUser'})
    async getAllUser(){
        try{
        let resp = await this.userService.getAllUser();
        return resp;
        }catch(err){
         console.log("err",err)
         return err;
        }

    }


    @MessagePattern({cmd:'getUserById'})
    async getUserById(id:number)
    {
        try{
         let resp=await this.userService.getUserById(id);
         return resp;
        }
        catch(error)
        {
         console.log(error);
         return error;
        }
    }


    @MessagePattern({cmd:'updateUser'})
    async updateUser(data:{id:number,body:any})
    {
        try{
         let resp=await this.userService.updateUser(data.id,data.body);
         return resp;
        }
        catch(error)
        {
         console.log(error);
         return error;
        }
    }

    @MessagePattern({cmd:'deleteUser'})
    async deleteUser(id:number)
    {
        try{
            console.log("id",id);
         let resp=await this.userService.deleteUser(id);
         return resp;
        }
        catch(error)
        {
         console.log(error);
         return error;
        }
    }
 

    @MessagePattern({ cmd: 'login' })
    async signIn(data: { email: string; password: string }) {
      try {
        console.log("data", data)
       let resp = await this.userService.signIn(data);
       console.log("resp",resp)
       return resp
      } catch (error) {
        console.log(error)
        return error
      }
    }


    @MessagePattern({cmd:'addUserPermission'})
    async addUserPermission(body:UserPermissionDto){
        try{
       
        let resp = await this.userService.addUserPermission(body);
        return resp;
        }catch(err){
         console.log("err",err);
         return err;
        }
    }


    @MessagePattern({cmd:'getUserPermission'})
    async getUserPermission(id:number){
        try{
       
        let resp = await this.userService.getUserPermission(id);
        return resp;
        }catch(err){
         console.log("err",err);
         return err;
        }
    }


    








}