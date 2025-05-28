import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProfesorService } from './profesor.service';
import { ProfesorDto } from './dto/profesor.entity';

@Controller('profesor')
export class ProfesorController {
    constructor(
        private readonly profesorService: ProfesorService
    ) {
        // Constructor logic if needed
    }

    @Post()
    crearProfesor(@Body() dto: ProfesorDto) { // Replace 'any' with the actual DTO type
        return this.profesorService.crearProfesor(dto); // Call the service method to create a professor
    }

    @Get()
    obtenerProfesores() {
        return this.profesorService.obtenerProfesores(); // Call the service method to get all professors
    }
}
