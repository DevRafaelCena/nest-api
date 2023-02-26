import { IsString } from "class-validator";
import { IsEmail, IsStrongPassword } from "class-validator";


export class CreateUserDto {

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({ minLength: 8, minUppercase: 1 })
  password: string;

}