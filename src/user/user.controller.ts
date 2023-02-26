import { Body, Controller, Get, Param, Post, Put, Patch , Delete, ParseIntPipe  } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService){}
    
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
  async readOne(@Param('id', ParseIntPipe) id) {
    
    const user = await this.userService.readOne(id);

    return { user: user }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() { email, name , password ,birthAt} : UpdatePutUserDto) {

    if(!birthAt){
      birthAt = null
    }

    const update = await this.userService.update(id, { email, name , password, birthAt });
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
