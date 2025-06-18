import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { EnviarMailDto } from './dto/enviar-mail.dto';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}



  @Post('prueba')
  async sendPasswordRecovery(@Body() dto: EnviarMailDto) {
    return this.mailService.sendPasswordRecovery(dto);
  }

  
}
