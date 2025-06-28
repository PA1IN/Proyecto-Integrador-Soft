import { IsNumber, IsString } from 'class-validator';

export class CarreraDto {
  @IsNumber()
  id: number;

  @IsString()
  nombre: string;

  @IsNumber()
  semestre: number;
}