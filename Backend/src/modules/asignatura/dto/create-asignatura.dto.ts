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

     @IsArray()
    @IsNumber({}, { each: true }) // valida que cada elemento del array sea un número
    @Type(() => Number) // transforma los elementos a número
    id_carreras: number[];
   

}