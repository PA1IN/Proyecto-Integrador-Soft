import { IsBoolean, IsNumber, IsString } from "class-validator";

export class PruebaDto{
    @IsNumber()
    id_asignatura: number;
    @IsNumber()
    id_columna: number;
    @IsNumber()
    id_profesor: number;
    @IsNumber()
    id_sala: number;
    @IsString()
    horario: string;
    @IsNumber()
    Dia: number;
    @IsBoolean()
    profesor_error: boolean;
    @IsBoolean()
    eliminado: boolean;
    



}