import { IsString } from "class-validator";

export class ProfesorRawDto {
    @IsString()
    name: string;
    
}