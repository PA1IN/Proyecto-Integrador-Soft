import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SalaService } from './sala.service';
import { crearSalaDto } from './dto/crear-sala.dto';

@Controller('sala')
export class SalaController {
    constructor(
        private readonly salaService: SalaService, 
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
    @Get('todas')
    obtenerSalasTodas() {
        return this.salaService.obtenerSalasTodas(); // Call the service method to get all rooms
    }

    @Patch('/:id')
    eliminarSala(@Param('id') id: number) {
        return this.salaService.eliminarSala(id); // Call the service method to delete a room by ID
    }

}
