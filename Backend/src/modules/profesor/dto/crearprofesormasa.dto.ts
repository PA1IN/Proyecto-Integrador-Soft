import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { ProfesorRawDto } from "./profesorraw.dto";

export class crearprofesormasaDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProfesorRawDto)
    profesores: ProfesorRawDto[];
}