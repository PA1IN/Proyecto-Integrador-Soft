import { Type } from "class-transformer";
import { IsArray, IsDate, IsNumber, IsString, ValidateNested } from "class-validator";
import { PruebaDto } from "src/modules/evaluacion/dto/crear-prueba.dto";


export class CreateCalendarioDto {
    @IsNumber()
    user_id: number;
    @IsString()
    nombre: string;
    @IsDate()
    fecha_creacion: Date;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PruebaDto)
    pruebas: PruebaDto[];

}
