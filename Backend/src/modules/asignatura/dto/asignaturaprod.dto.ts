import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, ValidateNested } from "class-validator";

export class asignaturaprodDto {
    @IsString()
    @IsNotEmpty()
    nrc: string;

    @IsString()
    @ValidateNested()
    @IsNotEmpty()
    @Transform(({ obj }) => obj.curso) 
    nombre: string;
    
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ obj }) => obj.carreras.map((c: any) => c.semestre))
    niveles: number[];

    @IsOptional()
    @IsBoolean()
    creada: boolean; 
    @IsArray()
     @ValidateNested({ each: true })
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @Transform(({ obj }) => obj.carreras.map((c: any) => c.id))
    id_carreras: number[]; 
   

}