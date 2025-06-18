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
      subject: 'Recuperación de contraseña',
      text: `Hola, haz clic en el siguiente enlace para restablecer tu contraseña: ${url}, su token es: ${dto.token}` ,
      html: `<b>Hola</b>,<br><p>Haz clic en este <a href="${url}">enlace</a> para restablecer tu contraseña.</p>`,
    });
  }
}

