import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalaService } from './sala.service';
import { crearSalaDto } from './dto/crear-sala.dto';

@Controller('sala')
export class SalaController {
    constructor(
        private readonly salaService: SalaService, // Replace 'any' with the actual service type
    ) {
        
    }

    @Post()
    crearSala(@Body() dto: crearSalaDto) { // Replace 'any' with the actual DTO type
        return this.salaService.crearSala(dto); // Call the service method to create a room
    }

    @Get()
    obtenerSalas() {
        return this.salaService.obtenerSalas(); // Call the service method to get all rooms
    }






}
