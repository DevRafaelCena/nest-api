import { Body, Controller, Get, Param, Post, Put, Patch , Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdatePatchUserDto } from './dto/update-patch-user-dto';
import { UpdatePutUserDto } from './dto/update-put-user-dto';

@Controller('user')
export class UserController {
    
  @Post()
  async create(@Body() body : CreateUserDto) {
    return body;
  }

  @Get()
  async read() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id') id) {
    console.log(id);
    return { user: {} }
  }

  @Put(':id')
  async update(@Param('id') id, @Body() { email, name , password } : UpdatePutUserDto) {
    console.log(id);
    return { email, name , password };
  }

  @Patch(':id')
  async updateOne(@Param('id') id, @Body() body: UpdatePatchUserDto) {
    console.log(id);
    return body;
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    console.log(id);
    return { id }
  }

}
