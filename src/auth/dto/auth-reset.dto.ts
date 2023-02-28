import { IsEmail, IsJWT, IsString, MinLength } from "class-validator";

export class AuthResetDTO{

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsJWT()
    token: string;


}