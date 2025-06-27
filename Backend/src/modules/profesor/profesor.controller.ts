import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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
    crearProfesor(@Body() dto: ProfesorDto) { 
        return this.profesorService.crearProfesor(dto); 
    }
    @Post('prod')
    crearProfesorProd(@Body() dto: ProfesorDto) { 
        return this.profesorService.crearProfesorProd(dto); // Call the service method to create a professor in production
    }

    @Get()
    obtenerProfesores() {
        return this.profesorService.obtenerProfesores(); // Call the service method to get all professors
    }
    @Get('creado')
    obtenerProfesoresCreado() {
        return this.profesorService.obtenerProfesoresCreado(); // Call the service method to get all created professors
    }
    @Get('todos')
    todosProfesores() {
        return this.profesorService.todosProfesores(); // Call the service method to get all professors
    }
    @Patch('/:id')
    eliminarProfesor(@Param('id') id: number) {
        return this.profesorService.eliminarProfesor(id); // Call the service method to delete a professor by ID
    }
}
