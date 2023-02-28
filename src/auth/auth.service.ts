import { Injectable, UnauthorizedException } from "@nestjs/common";
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


       const user = await this.prisma.user.findFirst({
            where:{
                email,
                password
            }
        })

        if(!user){
            throw new UnauthorizedException('Invalid Credentials')
        }

       return user
        
    }

    

    async forget(email : string){

        const user = await this.prisma.user.findFirst({
            where:{
                email
            }
        })

        if(!user){
            throw new UnauthorizedException('Invalid Credentials')
        }

        return true

    }

    async reset(password: string, token: string){

        // to do validar token

        const id = 1

        await this.prisma.user.update({
            where:{
                id
            },
            data:{
                password
            }
        })

        return true

    }

}