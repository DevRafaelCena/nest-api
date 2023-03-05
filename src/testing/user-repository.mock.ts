import { getRepositoryToken } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { UserEntityList } from "./user-entity-list.mock";


export const userRepositoryMock = {
    provide: getRepositoryToken(UserEntity),
    useValue: {
        exist : jest.fn().mockResolvedValue(true),
        save: jest.fn().mockResolvedValue(UserEntityList[0]),
        findOne: jest.fn().mockResolvedValue(UserEntityList[0]),
        findOneById: jest.fn(),
        find: jest.fn().mockResolvedValue(UserEntityList),
        delete: jest.fn(),
        create: jest.fn(),
        update: jest.fn()
    }
}