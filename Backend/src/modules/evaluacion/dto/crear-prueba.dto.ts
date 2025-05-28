import { IsBoolean, IsNumber, IsString } from "class-validator";

export class PruebaDto{
    @IsNumber()
    asignaturaCreadaId?: number;
    @IsNumber()
    asignaturaFijaId?: number;
    @IsNumber()
    idprofesor: number;
    @IsNumber()
    salaId: number;
    @IsString()
    horario: string;
    @IsNumber()
    Dia: number;
    @IsBoolean()
    profesorError: boolean;
    @IsBoolean()
    eliminado: boolean;


}