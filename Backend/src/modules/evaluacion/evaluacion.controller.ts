import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { CrearManyPruebasDto } from './dto/crear-many-pruebas.dto';

@Controller('evaluacion')
export class EvaluacionController {

    constructor(
        private readonly evaluacionService: EvaluacionService, // Inject your service here
    ) {
        
    }


    @Post()
    async  create(@Body() dto: CrearManyPruebasDto) {
        return this.evaluacionService.crearPruebas(dto); // Call the service method to create an evaluation
    }
    @Get(':calendarioId')
    async getPruebasByCalendario(@Param('calendarioId') calendarioId: string) {
        return this.evaluacionService.obtenerPruebasPorCalendario(+calendarioId); // Call the service method to get evaluations by calendar
    }
}
