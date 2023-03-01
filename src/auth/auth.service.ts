import { Injectable, UnauthorizedException,BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ){}

    async createToken(user : User){
        return {
            accessToken : this.jwtService.sign({
                id: user.id,
                email: user.email,
                name: user.name
            },{
                expiresIn: '1d',
                subject: String(user.id),
                issuer: 'login',
                audience: 'users'
            })
        }
    }

    async checkToken(token : string){
        try{
            const data = await this.jwtService.verify(token, {
                audience : 'users',
            })

            return data
        }catch(e){
            throw new BadRequestException('Invalid Token')
        }
       
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

       return this.createToken(user)
        
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

        const user = await this.prisma.user.update({
            where:{
                id
            },
            data:{
                password
            }
        })

        return this.createToken(user)

    }

    async register(data : AuthRegisterDTO){

        const user = await this.userService.create(data)

        return this.createToken(user)

    }

    async isValidToken(token : string){
        try{
            
            return this.checkToken(token)
        }catch(e){
            return false
        }
    }

}