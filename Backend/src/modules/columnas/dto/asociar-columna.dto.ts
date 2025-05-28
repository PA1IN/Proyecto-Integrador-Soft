import { Type } from "class-transformer";
import { IsArray, IsNumber, ValidateNested } from "class-validator";

import { columnaDto } from "./columna.dto";

export class AsociarColumnaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => columnaDto)
  columnas: columnaDto[];

  @IsNumber()
  calendarioId: number; 
}