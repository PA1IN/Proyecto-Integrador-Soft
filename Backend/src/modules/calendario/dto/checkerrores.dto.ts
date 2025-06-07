import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { PruebaDto } from "src/modules/evaluacion/dto/crear-prueba.dto";

export class CheckErroresDto {
  @IsNumber()
  caledarioId: number;
  @IsString()
  celdaid: string;
  @IsNumber()
  dia: number;
  
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PruebaDto)
  pruebas: PruebaDto[];
}