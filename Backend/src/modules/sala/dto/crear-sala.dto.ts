import { IsBoolean, IsOptional, IsString } from "class-validator";

export class crearSalaDto{
    @IsString()
    nombre: string;
    @IsOptional()
    @IsBoolean()
    creada: boolean;


}