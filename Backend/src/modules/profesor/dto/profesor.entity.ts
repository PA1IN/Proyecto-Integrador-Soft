import { IsAlpha, IsString } from "class-validator";

export class ProfesorDto {
    @IsString()
    nombre: string; 
}