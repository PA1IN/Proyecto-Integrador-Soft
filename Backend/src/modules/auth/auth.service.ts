import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegistroDto } from './dto/register.dto'; // Assuming you have a DTO for registration
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { MailService } from '../mail/mail.service';
import { v4 } from 'uuid';
import { RecuperarContrasenaDto } from './dto/recuperar-contraseña.dto';
@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService, // Assuming you have JwtService injected
        private readonly mailService: MailService, // Assuming you have a MailService for sending emails
        
    ) {}
    
    
    async login({rut, password}: LoginDto) {
        const user = await this.userService.getUserByRut(rut);
        if (!user) {
            throw new BadRequestException('credenciales invalidas');
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('credenciales invalidas');
        }
        const payload = { rut: user.rut, name: user.name, correo: user.correo };
        const  token = await this.jwtService.signAsync(payload);
        return {
            token,
            user: {
                rut: user.rut,
                name: user.name,
                correo: user.correo,
            },
        };


        
    }

    async register({rut, nombre, correo, password}: RegistroDto) {
        const user = await this.userService.getUserByRut(rut);
        if (user) {
            throw new BadRequestException('El usuario ya existe');
        }
        const userByEmail = await this.userService.getUserByEmail(correo);
        if (userByEmail) {
            throw new BadRequestException('El correo ya está registrado');
        }
        return await this.userService.createUser({
            rut, 
            name:nombre, 
            correo, 
            password: await bcryptjs.hash(password, 10)});
        
    }

    async enviarCorreoRecuperacion(email: string) {
    const token = v4(); 
    const user = await this.userService.getUserByEmail(email);
    if (!user) {
        throw new BadRequestException('Usuario no encontrado');
    }
     await this.userService.añadirTokenRecuperacion(user, token);

     const dto = {
        email,
        token,
    };
     await this.mailService.sendPasswordRecovery(dto);
    }
    async recoverPassword(dto :RecuperarContrasenaDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) {
            throw new BadRequestException('Token invalido o expirado');
        }
        user.password = await bcryptjs.hash(dto.newPassword, 10);
        user.recoverToken = null; // Clear the recovery token
        return await this.userService.updateUser(user);
    }
    
    
   



}
