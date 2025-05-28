import { Type } from "class-transformer";
import { IsArray, IsNumber, Validate, ValidateNested } from "class-validator";
import { PruebaDto } from "./crear-prueba.dto";



export class CrearManyPruebasDto {
@IsArray()
@ValidateNested({ each: true })
@Type(() => PruebaDto)
pruebas: PruebaDto[];
@IsNumber()
calendarioId: number;

}