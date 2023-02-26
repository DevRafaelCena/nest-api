import { Injectable , NotFoundException} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user-dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user-dto";
import { UpdatePutUserDto } from "./dto/update-put-user-dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}

    async create({email, password , name , birthAt} : CreateUserDto){

        const data: any = {}

        if(birthAt){
            data.birthAt = new Date(birthAt);
        }
        if (name) data.name = name;

        if (password) data.password = password;

        if (email) data.email = email;

        return await this.prisma.user.create({
            data
        })
    }

    async list(){
        return await this.prisma.user.findMany();
    }

    async readOne(id: number){
        return await this.prisma.user.findUnique({
            where: {
                id
            }
        })
    }

    async update(id, { email, password , name , birthAt }: UpdatePutUserDto){

        await this.exists(id);

        const data: any = {}

        if(birthAt){
            data.birthAt = new Date(birthAt);
        }
        if (name) data.name = name;

        if (password) data.password = password;

        if (email) data.email = email;
        return await this.prisma.user.update({
            where: {
                id
            },
            data
        });
    }

    async updatePartial(id, {email, password , name , birthAt}: UpdatePatchUserDto){

        await this.exists(id);

        const data: any = {}

        if(birthAt){
            data.birthAt = new Date(birthAt);
        }
        if (name) data.name = name;

        if (password) data.password = password;

        if (email) data.email = email;

        return await this.prisma.user.update({
            where: {
                id
            },
            data
        });
    }

    async delete(id: number){

        await this.exists(id);

        return await this.prisma.user.delete({
            where: {
                id
            }
        })
    }

    async exists(id: number){
        if(!(await this.readOne(id))){
            throw new NotFoundException('User not found')
        }
    }
}