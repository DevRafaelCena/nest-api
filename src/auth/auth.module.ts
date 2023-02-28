import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "src/prisma/prisma.module";
import { UserModule } from "src/user/user.module";
import { AuthController } from "./auth.controller";

@Module({
    imports: [JwtModule.register({
        secret: "}|+0?aymE;+>b9l1l53s<hNjmU1tU-r%"
     }),
     UserModule,
     PrismaModule
    ],
    controllers: [AuthController],
    providers: []
})
export class AuthModule{

}