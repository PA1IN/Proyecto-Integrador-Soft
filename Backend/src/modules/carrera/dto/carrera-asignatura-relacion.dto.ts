import { IsNumber, IsString } from "class-validator";

export class CarreraAsignaturaRelacionDto {
    @IsString()
    nombre: string;

    @IsNumber()
    asignaturaId: number;

  
}