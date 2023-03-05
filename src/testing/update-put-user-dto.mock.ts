import { Role } from "../enums/role.enum";
import { UpdatePutUserDto } from "../user/dto/update-put-user-dto";


export const updatePutUserDto: UpdatePutUserDto = {
    birthAt: '1990-01-01',
    name: 'Teste',
    email: 'rafael222.cena@hotmail.com',
    password: '@1q2w3e#A',
    role: Role.User
}