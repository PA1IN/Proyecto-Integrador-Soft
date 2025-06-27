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
    crearSala(@Body() dto: crearSalaDto) { 
        return this.salaService.crearSala(dto); 
    }
    @Post('prod')
    crearSalaprod(@Body() dto: crearSalaDto) { 
        return this.salaService.crearSalaprod(dto); 
    }

    @Get()
    obtenerSalas() {
        return this.salaService.obtenerSalas(); // Call the service method to get all rooms
    }
    @Get('creadas')
    salascreadas() {
        return this.salaService.salascreadas(); // Call the service method to get all created rooms
    }






}
