import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.servicer";

@Module({
    providers: [PrismaService],
    exports: [PrismaService]
})
export class PrismaModule {}