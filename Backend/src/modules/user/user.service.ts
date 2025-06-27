import { ApiResponse } from 'src/interface/ApiResponse';
import { HttpException,HttpStatus  } from '@nestjs/common';
import { CreateResponse } from 'src/utils/api-response.util.ts';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  
  async createUser(data: { name: string, rut: string, password : string, correo: string  }): Promise<User> {
    const newUser = new User();
    newUser.name = data.name;
    newUser.rut = data.rut;
    newUser.password = data.password;
    newUser.correo = data.correo;
    return await this.userRepository.save(newUser);
  }

  
  async getAllUsers(): Promise<ApiResponse<User[] | null>> {
    const users = await this.userRepository.find();

    if (!users.length) {
      throw new HttpException(
        CreateResponse('No hay usuarios registrados', null, 'NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    return CreateResponse('Usuarios obtenidos correctamente', users, 'OK');
  }

  
  async dataUserByRut(rut: string): Promise<ApiResponse<User | null>> {
    const user = await this.userRepository.findOne({ where: { rut } });

    if (!user) {
      throw new HttpException(
        CreateResponse('No hay usuarios registrados', null, 'NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }

    return CreateResponse('Usuario encontrado', user, 'OK');
  }

 
  async getUserByRut(rut: string): Promise<User | null>{
    const user = await this.userRepository.findOne({ where: { rut } });

    if (!user) {
      //throw new HttpException(
       // { message: 'No hay usuario registrado', error: 'NOT_FOUND' },
        //HttpStatus.NOT_FOUND,
      //);
    }

    return user;
  }
  async getUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { correo: email } });

    
    

    return user;
  }
  async añadirTokenRecuperacion(user: User, token: string): Promise<User> {
    user.recoverToken = token; // Assuming you have a recoverToken field in your User entity
    return await this.userRepository.save(user);
  }


  async getUserByToken(token: string) {
    console.log("Token recibido:", token);
    const user = await this.userRepository.findOne({ where: { recoverToken: token } });

    if (!user) {
      throw new HttpException(
        CreateResponse('No hay usuario registrado con ese token', null, 'NOT_FOUND'),
        HttpStatus.NOT_FOUND,
      );
    }
    
    return {correo : user.correo};
  }



  async updateUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}

