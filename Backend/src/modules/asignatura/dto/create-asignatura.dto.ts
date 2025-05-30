import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAsignaturaDto {
    @IsString()
    @IsNotEmpty()
    NRC: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;
    
    @IsNumber()
    nivel: number;

   

}