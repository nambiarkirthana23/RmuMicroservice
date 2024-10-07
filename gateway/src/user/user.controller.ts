import { Body, Controller,Delete,Get,HttpStatus,Param,Post,Put,Res, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CONSTANT_MSG } from "src/common-dto/const";
import { UserDto } from "./user.dto";
import { CommonService } from "src/device/services/common-service";
import { response } from "express";
import { UserAuthGuard } from "./guards/auth-guard";
import { UserPermissionDto } from "./permission.dto";
import { RolesGuard } from "./guards/role-guards";
import { UserRole } from "./user_enum";
import { Roles } from "./role.decorator";

@Controller('user')
export class UserController{
    constructor(private readonly userService:UserService,
     ){}
    @Post('/add')
    async addUser(@Body() body: UserDto, @Res() res: any,) {
        try {
          console.log("body ",body);
          let resp = await this.userService.addUser(body);
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.CREATED) {
            res.status(resp.statusCode).send({ success: resp.message ,});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }
      }


      @Get('/users')
      async getAllUser( @Res() res: any,) {
        try {
          let resp = await this.userService.getAllUser();
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.OK) {
            res.status(resp.statusCode).send({ success: resp.message ,data:resp.data});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }
      }

//created permission table,

      @Get('/:id')
     @UseGuards(RolesGuard,UserAuthGuard)
      @Roles(UserRole.USER)
      async getUserById( @Res() res: any,@Param('id') id:number) {
        try {
          let resp = await this.userService.getUserById(id);
    
          if (resp.code === 'ECONNREFUSED') {
            res
              .status(HttpStatus.INTERNAL_SERVER_ERROR)
              .send({ error: 'Device Microservice ECONNREFUSED' });
          } else if (resp.statusCode === HttpStatus.OK) {
            res.status(resp.statusCode).send({ success: resp.message ,data:resp.data});
          } else {
            res.status(resp.statusCode).send({ error: resp.message });
          }
        } catch (error) {
         console.log(error);
          res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
            message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
            statusCode: false,
          });
        }

}



@Put('update/:id')
async updateUser( @Res() res: any,@Param('id') id:number,@Body() body:UserDto) {
  try {
    let resp = await this.userService.updateUser(id,body);

    if (resp.code === 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Device Microservice ECONNREFUSED' });
    } else if (resp.statusCode === HttpStatus.ACCEPTED) {
      res.status(resp.statusCode).send({ success: resp.message });
    } else {
      res.status(resp.statusCode).send({ error: resp.message });
    }
  } catch (error) {
   console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode: false,
    });
  }
}


@Delete('delete/:id')
async deleteUser( @Res() res: any,@Param('id') id:number) {
  try {
    console.log("id",id);
    let resp = await this.userService.deleteUser(id);

    if (resp.code === 'ECONNREFUSED') {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ error: 'Device Microservice ECONNREFUSED' });
    } else if (resp.statusCode === HttpStatus.ACCEPTED) {
      res.status(resp.statusCode).send({ success: resp.message });
    } else {
      res.status(resp.statusCode).send({ error: resp.message });
    }
  } catch (error) {
   console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
      statusCode: false,
    });
  }
}



// @Post('/login')
//   async signIn(@Body() body: { email: string; password: string },@Res() res:any) {
//     try {
//       console.log("signIn body",body);
      
//       const resp = await this.userService.signIn(body);

        
//        if (resp.statusCode === HttpStatus.CREATED) {
//         res
//           .status(resp.statusCode)
//           .send({ success: resp.message,data:resp.data.access_token });
//          // console.log(res.data.access_token);
//       } else {
//         res.status(resp.statusCode).send({ error: resp.message });
      
//       }
//       console.log("resp",resp);
     
//     } catch (err) {
//       console.error('Login Error:', err);
//       res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
//         message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
//         statusCode: false,
//       });
   
//     }

//   }


@Post('/signIn')
  async signIn(@Body() userDto: { email: string; password: string },@Res() res:any) {
    try {
      console.log(userDto);
      const resp = await this.userService.signIn(userDto);

      if (resp.code == 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res
          .status(resp.statusCode)
          .send({ status:resp.statusCode,message: resp.message, data: resp.data });
      } else {
        res.status(resp.statusCode).send({ status:resp.statusCode, error: resp.message });
      }
      console.log("resp",resp)
   
    } catch (err) {
      console.error('Login Error:', err);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
   
    }

  }
  

@Post('/permission')
  async addUserPermission(@Body() body: UserPermissionDto, @Res() res: any,) {
    try {
      console.log("body ",body);
      let resp = await this.userService.addUserPermission(body);

      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.CREATED) {
        res.status(resp.statusCode).send({ success: resp.message ,});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
    } catch (error) {
     console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }

@Get(':id/permission')
  async getUserPermission(@Param('id') id:number, @Res() res: any,) {
    try {
     console.log(id);
      let resp = await this.userService.getUserPermission(id);

      if (resp.code === 'ECONNREFUSED') {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .send({ error: 'Device Microservice ECONNREFUSED' });
      } else if (resp.statusCode === HttpStatus.OK) {
        res.status(resp.statusCode).send({ success: resp.message ,data:resp.data});
      } else {
        res.status(resp.statusCode).send({ error: resp.message });
      }
    } catch (error) {
     console.log(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: CONSTANT_MSG.INTERNAL_SERVER_ERR,
        statusCode: false,
      });
    }
  }








}