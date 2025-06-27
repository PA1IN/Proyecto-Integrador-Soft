import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAsignaturaDto {
    @IsString()
    @IsNotEmpty()
    nrc: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNumber()
    nivel: number;

    @IsOptional()
    @IsBoolean()
    creada: boolean;
    @IsArray()

    
    @IsNumber() // valida que cada elemento del array sea un número
    id_carrera: number;  
   

}