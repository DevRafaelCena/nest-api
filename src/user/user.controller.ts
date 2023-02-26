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
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param('id', ParseIntPipe) id) {
    console.log(id);
    return { user: {} }
  }

  @Put(':id')
  async update(@Param('id', ParseIntPipe) id, @Body() { email, name , password } : UpdatePutUserDto) {
    console.log(id);
    return { email, name , password };
  }

  @Patch(':id')
  async updateOne(@Param('id', ParseIntPipe) id, @Body() body: UpdatePatchUserDto) {
    console.log(id);
    return body;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    console.log(id);
    return { id }
  }

}
