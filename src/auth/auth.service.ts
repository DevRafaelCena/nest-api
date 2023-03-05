import { Injectable, UnauthorizedException,BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import * as bcrypt from 'bcrypt'
import { MailerService } from "@nestjs-modules/mailer/dist";
import { UserEntity } from "src/user/entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,      
        private readonly userService: UserService,
        private readonly mailer: MailerService,

        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ){}

    async createToken(user : UserEntity){
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


       const user = await this.usersRepository.findOneBy({email})

       console.log(user)

        if(!user){
            throw new UnauthorizedException('Invalid Credentials')
        }

        const isValid = await bcrypt.compare(password, user.password)

        if(!isValid){
            throw new UnauthorizedException('Invalid Credentials')
        }

       return this.createToken(user)
        
    }

    

    async forget(email : string){

        const user = await this.usersRepository.findOne({
            where: {
                email
            }
       })

        if(!user){
            throw new UnauthorizedException('Invalid Credentials')
        }

        const token = await this.jwtService.sign({
            id: user.id,
            email: user.email,
        },{
            expiresIn: '30 minutes',
            issuer: 'forget',
            audience: 'users'
        })

        await this.mailer.sendMail({
            to: email,
            from: 'rafael.cena@hotmail.com',
            subject: 'Reset Password',
            template: 'forget',
            context: {
                name: user.name,
                token
            }
        })

        return true

    }

    async reset(password: string, token: string){

        // to do validar token

        try{
            const data = await this.jwtService.verify(token, {
                audience : 'users',
                issuer: 'forget'
            })     
     

            const salt = await bcrypt.genSalt();
            password = await bcrypt.hash(password, salt);

            await this.usersRepository.update(Number(data.id), {
                password
            })

            const user = await this.userService.readOne(Number(data.id))

        return this.createToken(user)
    }catch(e){
        throw new BadRequestException('Invalid Token')
    }

    }

    async register(data : AuthRegisterDTO){    

        const user = await this.userService.create(data)

        return await this.createToken(user)

    }

    async isValidToken(token : string){
        try{
            
            return this.checkToken(token)
        }catch(e){
            return false
        }
    }

}