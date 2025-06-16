import { ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsNumber, IsString } from "class-validator";

export class PruebaDto{
    @IsNumber()
    id_asignatura: number;
    @IsNumber()
    id_columna: number;
    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsNumber({}, { each: true }) // Valida que cada elemento sea un número
    id_profesores: number[];

    @IsArray()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsNumber({}, { each: true })
    id_salas: number[];
    
    @IsString()
    horario: string;
    @IsNumber()
    dia: number;
    @IsBoolean()
    profesor_error: boolean;
    @IsBoolean()
    eliminado: boolean;
    @IsString()
    celdaid: string;
    
    



}