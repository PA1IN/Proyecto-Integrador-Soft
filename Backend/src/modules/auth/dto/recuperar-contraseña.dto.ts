import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RecuperarContrasenaDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @IsString()
    newPassword: string;
    
}