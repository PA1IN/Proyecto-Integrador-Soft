import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { PruebaDto } from "src/modules/evaluacion/dto/crear-prueba.dto";

export class CheckErroresDto {
  @IsNumber()
  caledarioId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PruebaDto)
  pruebas: PruebaDto[];
}