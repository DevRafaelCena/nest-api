import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {

    constructor(
        private readonly JWTService: JwtService,
        private readonly prisma: PrismaService
    ){}

    async createToken(){
    
    }

    async checkToken(token : string){
        
    }

    async login(email : string , password : string){

    }

    

    async forget(){

    }

    async reset(){

    }

}