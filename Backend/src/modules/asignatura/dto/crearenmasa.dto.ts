import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { AsignaturarawDto } from "./asignaturaraw.dto";

export class CrearenmasaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AsignaturarawDto)
  asignaturas: AsignaturarawDto[];
}