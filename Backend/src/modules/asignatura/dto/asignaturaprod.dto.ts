import { Transform, Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Validate, ValidateNested } from "class-validator";

export class asignaturaprodDto {
 @IsString()
  @IsNotEmpty()
  nrc: string;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true }) // cada elemento del array debe ser número
  niveles: number[];

  
  @IsArray()
  @ArrayNotEmpty()
  @IsString()
  carrera_nombres: string[];

  @IsOptional()
  @IsBoolean()
  creada?: boolean;
   

}