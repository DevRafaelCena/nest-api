// "typescript.preferences.importModuleSpecifier": "relative",  
// configurar a linha nas configurações do vscode para que o import funcione

import { Test, TestingModule } from "@nestjs/testing"
import { Role } from "../enums/role.enum"
import { userRepositoryMock } from '../testing/user-repository.mock'
import { UserEntityList } from "../testing/user-entity-list.mock"
import { UserService } from "./user.service"
import { createUserDto } from "../testing/create-user-dto.mock"
import { UserEntity } from "./entity/user.entity"
import { Repository } from "typeorm"
import { getRepositoryToken } from "@nestjs/typeorm"
import { updatePutUserDto } from "../testing/update-put-user-dto.mock"
import { updatePatchtUserDto } from "../testing/update-patch-user-dto.mock"


describe('UserService', () => {

    let userService:UserService
    let usersRepository : Repository<UserEntity>

    beforeEach(async () =>{
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,            
                userRepositoryMock            
            ]
        }).compile()

        userService = module.get<UserService>(UserService)
        usersRepository = module.get(getRepositoryToken(UserEntity))
    })

    test('Valida a definição', () =>{
        expect(userService).toBeDefined()
        expect(usersRepository).toBeDefined()
    })

    describe('Create', () => { 

        test('method create', async () => {  
            
            jest.spyOn(usersRepository, 'exist').mockResolvedValueOnce(false)
           

            const result = await userService.create(createUserDto)

            expect(result).toEqual(UserEntityList[0])

        })
    })

    describe('Read',  () => { 
            
            test('method findAll', async () => {           
    
                const result = await userService.list()
    
                expect(result).toEqual(UserEntityList)
    
            })   

            test('method readOne', async () => {           
    
                const result = await userService.readOne(1)
    
                expect(result).toEqual(UserEntityList[0])
    
            })
      
    })

    describe('Update',  () => {
            
            test('method update', async () => {           
    
                const result = await userService.update(1, updatePutUserDto)
    
                expect(result).toEqual(UserEntityList[0])
    
            })

            test('method updatePartial', async () => {

                const result = await userService.updatePartial(1, updatePatchtUserDto)
    
                expect(result).toEqual(UserEntityList[0])


            })
     })

    describe('Delete',  () => { })


})