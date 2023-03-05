import { Role } from "../enums/role.enum";
import { CreateUserDto } from "../user/dto/create-user-dto";


export const createUserDto: CreateUserDto = {
    birthAt: '1990-01-01',
    name: 'Teste',
    email: 'rafael222.cena@hotmail.com',
    password: '@1q2w3e#A',
    role: Role.User
}