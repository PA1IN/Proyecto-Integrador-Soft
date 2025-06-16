import { IsDate, IsNumber, IsString } from "class-validator";

export class columnaDto {
  @IsNumber()
  dia: number;
  @IsString()
  fecha: string;
  
  }
