import { IsEnum, IsString } from "class-validator";
import { IsEmail, IsStrongPassword , IsOptional,IsDateString  } from "class-validator";
import { Role } from "../../enums/role.enum";


export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsDateString()
  birthAt: string

  @IsStrongPassword({ minLength: 8, minUppercase: 1 })
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role: number

}