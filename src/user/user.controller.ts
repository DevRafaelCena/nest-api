import { Body, Controller, Get, Param, Post, Put, Patch , Delete, ParseIntPipe , UseGuards } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { LogInterceptor } from '../interceptors/log.interceptors';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Roles(Role.Admin)  // regra de permissao global
@UseInterceptors(LogInterceptor)
@UseGuards(AuthGuard, RoleGuard)
@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService){}
    
  @Roles(Role.Admin)  // regra de permissao individual
  @Post()
  async create(@Body() body : CreateUserDto) {
    return this.userService.create(body)
  }

  
  @Get()
  async read() {

    const users = await this.userService.list();

    return { users: users };
  }

 
  @Get(':id')
  async readOne(@ParamId() id) {
    
    const user = await this.userService.readOne(id);

    return user
  }

 
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() { email, name , password ,birthAt, role} : UpdatePutUserDto) {

    if(!birthAt){
      birthAt = null
    }

    const update = await this.userService.update(id, { email, name , password, birthAt , role});
    return update ;
  }

 
  @Patch(':id')
  async updateOne(@Param('id', ParseIntPipe) id, @Body() body: UpdatePatchUserDto) {
    const update = await this.userService.updatePartial(id, body);
    return update;
  }

 
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
   
    return  await this.userService.delete(id);
  }

}
