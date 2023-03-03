import { BadRequestException, Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { User } from "src/decorators/user.decorator";
import { AuthGuard } from "src/guards/auth.guard";
import { AuthService } from "./auth.service";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { join } from 'path'
import { FileService } from "src/file/file.service";

@Controller("auth")
export class AuthController {

    constructor(        
        private readonly authService: AuthService,
        private readonly fileService: FileService
        ){}

    @Post('/login')
    async login(@Body() {email , password}: AuthLoginDTO){
        return this.authService.login(email, password);
    }

    @Post('/register')
    async register(@Body() body: AuthRegisterDTO){

        return this.authService.register(body);

    }

    @Post('/forget')
    async forget(@Body() body: AuthForgetDTO){

        return this.authService.forget(body.email);

    }

    @Post('reset')
    async reset(@Body() {password , token}: AuthResetDTO){
        return this.authService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user){

        return user;
    }


    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user,
        @UploadedFile(
            new ParseFilePipe({
                validators: [ 
                    new FileTypeValidator({fileType: 'image/png'}),
                    new MaxFileSizeValidator({maxSize: 1000000})
                ]
            })
        ) photo : Express.Multer.File){

        const path = await join(__dirname, '..', '..', 'storage', 'photos', 'photo_'+ user.id + '.jpg')
       
        try{
           await this.fileService.upload(photo, path);
        }catch(e){
            throw new BadRequestException('Error uploading photo')
        }
        return {'message': 'Photo uploaded'}
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files : Express.Multer.File[]){       
        return files
    }


}