import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { EnviarMailDto } from './dto/enviar-mail.dto';

@Injectable()
export class MailService {

   constructor(private readonly mailerService: MailerService) {}

 
  async sendPasswordRecovery(dto : EnviarMailDto) {
    const url = `http://localhost:3000/recuperar-contrasena`;

   await this.mailerService.sendMail({
  to: dto.email,
  subject: 'Código de verificación para restablecer contraseña',
  text: `Hola, este es tu código de verificación para restablecer tu contraseña: ${dto.token}`,
  html: `
    <p><b>Hola,</b></p>
    <p>Este es tu <b>código de verificación</b> para restablecer tu contraseña:</p>
    <h2 style="color: #2d89ef;">${dto.token}</h2>
    <p>Ingresa este código en la aplicación para continuar con el proceso.</p>
  `,
});
  }
}

