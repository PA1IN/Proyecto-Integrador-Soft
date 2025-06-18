import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse } from 'src/interface/ApiResponse';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("createUser")
    create(@Body() createUserDto: CreateUserDto) {
    const {name, rut, password, correo} = createUserDto
    console.log(name);
    return this.userService.createUser({name, rut, correo, password});
  }
  @Get(":rut") 
    getUser(@Param("rut") rut: string):Promise<ApiResponse<any>> {
    return this.userService.dataUserByRut(rut);
}

 @Get("token/:token") 
    getuserbytoken(@Param("token") token: string): Promise<String | null> {
    return this.userService.getUserByToken(token);
}



  
}
