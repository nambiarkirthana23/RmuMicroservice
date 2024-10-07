import { Optional } from "@nestjs/common";
import { IsAlphanumeric, IsEmail, IsNotEmpty, IsNumber, IsString, Length, Matches } from "class-validator";


export class UserDto {
  @IsNotEmpty()
  role: number;

  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message: 'Password too weak. It must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @Length(2, 50)
  name: string;


  @IsNotEmpty()
  @IsString()
  mobile: string;

  @IsNotEmpty()
  @IsNumber()
  agency: number;

  @Optional()
  //    @IsString()
  department: string;
}