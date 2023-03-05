import { BadRequestException, Injectable , NotFoundException} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user-dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user-dto";
import { UpdatePutUserDto } from "./dto/update-put-user-dto";
import * as bcrypt from 'bcrypt'
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
        ) {}

    async create({email, password , name , birthAt, role} : CreateUserDto){

        try{
            
                const data: any = {}

                if(birthAt){
                    data.birthAt = new Date(birthAt);
                }
                if (name) data.name = name;

                if (password) {
                    const salt = await bcrypt.genSalt();
                    data.password = await bcrypt.hash(password, salt);
                };

                if (email) data.email = email;

                
               if(await this.usersRepository.exist({
                    where: {
                        email
                    }
               })) {
                     throw new BadRequestException('Email already exists');
               }


                if (role) data.role = role;

                const user = this.usersRepository.create(data) as Object;

                const save = await this.usersRepository.save(user).then((user) => {
                    return user;
                });               

                return save;
        }catch(err){
            throw new BadRequestException(err.message)
        }
    }

    async list(){
        return await this.usersRepository.find();
    }

    async readOne(id: number){

        await this.exists(id);
        
        return await this.usersRepository.findOne({
            where: {
                id
            }
        })
    }

    async update(id, { email, password , name , birthAt, role }: UpdatePutUserDto){

        await this.exists(id);

        const data: any = {}

        if(birthAt){
            data.birthAt = new Date(birthAt);
        }
        if (name) data.name = name;

        if (password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt);
        };

        if (email) data.email = email;

        if (role) data.role = role;

        await this.usersRepository.update(id, data);

        return await this.readOne(id);
    }

    async updatePartial(id, {email, password , name , birthAt, role}: UpdatePatchUserDto){

        await this.exists(id);

        const data: any = {}

        if(birthAt){
            data.birthAt = new Date(birthAt);
        }
        if (name) data.name = name;

        if (password) {
            const salt = await bcrypt.genSalt();
            data.password = await bcrypt.hash(password, salt);
        };

        if (email) data.email = email;

        if (role) data.role = role;

        await this.usersRepository.update(id, data);
        
        return await this.readOne(id);
    }

    async delete(id: number){

        await this.exists(id);

        await this.usersRepository.delete(id);

        return true;
    }

    async exists(id: number){

        const exists = await this.usersRepository.exist({
            where: {
                id
            }
        });

        if(!exists){
            throw new NotFoundException('User not found')
        }        
    }
}