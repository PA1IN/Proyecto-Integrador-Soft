import { IsEmail, IsString } from "class-validator";

export class EnviarMailDto {
    @IsEmail()
    email: string;
    @IsString()
    token: string;

}