import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { CarreraDto } from './carreraprod.dto';


export class AsignaturarawDto {
  @IsNumber()
  id: number;

  @IsNumber()
  desde_banner: number;

  @IsString()
  comentario: string;

  @IsString()
  dia: string;

  @IsString()
  bloque: string;

  @IsString()
  sala: string;

  @IsString()
  curso: string;

  @IsNumber()
  idcurso: number;

  @IsString()
  nrc: string;

  @IsString()
  profesor: string;

  @IsArray()
  @Type(() => CarreraDto)
  carreras: CarreraDto[];

  @IsArray()
  @IsOptional()
  areas: any[]; // o tipa si lo necesitas

  @IsString()
  area: string;
}