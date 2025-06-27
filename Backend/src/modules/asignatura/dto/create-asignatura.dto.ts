import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAsignaturaDto {
    @IsString()
    @IsNotEmpty()
    nrc: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ obj }) => obj.curso) // Mapeamos "curso" del JSON a "nombre"
    nombre: string;
    
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ obj }) => obj.carreras.map((c: any) => c.semestre))
    niveles: number[];

    @IsOptional()
    @IsBoolean()
    creada: boolean; 
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ obj }) => obj.carreras.map((c: any) => c.id))
    id_carreras: number[]; 
   

}