import { IsAlpha, IsBoolean, IsOptional, IsString } from "class-validator";

export class ProfesorDto {
    @IsString()
    nombre: string; 
    @IsOptional()
    @IsBoolean()
    creado: boolean;
}