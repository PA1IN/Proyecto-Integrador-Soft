import { IsDate, IsNumber } from "class-validator";

export class columnaDto {
  @IsNumber()
  dia: number;
  @IsDate()
  fecha: Date;
  
  }
