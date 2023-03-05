import { Role } from "../enums/role.enum";
import { UserEntity } from "../user/entity/user.entity";



export const UserEntityList : UserEntity[] = [
    {
        name: 'João',
        email: 'joao@hotmail.com',
        birthAt: new Date('1990-01-01'),
        id: 1,
        password: '$2b$10$fjqnEKH3G64ptB8Dvpr88eY/A1lJ1hUdDY0.MvB7FFjF9py6lVmYa',
        role: Role.Admin,
        createdAt: new Date(),
        updatedAt:  new Date()
    },
    {
        name: 'João2',
        email: 'joao2@hotmail.com',
        birthAt: new Date('1991-01-01'),
        id: 1,
        password: '$2b$10$fjqnEKH3G64ptB8Dvpr88eY/A1lJ1hUdDY0.MvB7FFjF9py6lVmYa',
        role: Role.User,
        createdAt: new Date(),
        updatedAt:  new Date()
    },

    {
        name: 'João3',
        email: 'joao3@hotmail.com',
        birthAt: new Date('1992-01-01'),
        id: 1,
        password: '$2b$10$fjqnEKH3G64ptB8Dvpr88eY/A1lJ1hUdDY0.MvB7FFjF9py6lVmYa',
        role: Role.Admin,
        createdAt: new Date(),
        updatedAt:  new Date()
    }

]
