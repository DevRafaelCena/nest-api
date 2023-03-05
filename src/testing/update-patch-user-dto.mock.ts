import { Role } from "../enums/role.enum";
import { UpdatePatchUserDto } from "../user/dto/update-patch-user-dto";


export const updatePatchtUserDto: UpdatePatchUserDto = {
    birthAt: '1990-01-01',
    name: 'Teste',
    email: 'rafael222.cena@hotmail.com',
    role: Role.User
}