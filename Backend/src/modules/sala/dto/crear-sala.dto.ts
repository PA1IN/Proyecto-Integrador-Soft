import { IsString } from "class-validator";

export class crearSalaDto{
    @IsString()
    nombre: string;


}