import { IsDate, IsNumber, IsString } from "class-validator";


export class CreateCalendarioDto {
    @IsNumber()
    user_id: number;
    @IsString()
    nombre: string;
    @IsDate()
    fecha_creacion: Date;

}
