import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { HorarioAsignaturaDto } from './dto/horario-asignatura.dto';
import { AgregarProfesorDto } from './dto/agregarprofesor.dto';

@Controller('asignatura')
export class AsignaturaController {

    constructor(
        private readonly asignaturaService: AsignaturaService, // Inject your service here
    ) {}
    
    @Get()
    getAsignaturasc() {
        return this.asignaturaService.getAsignaturasc(); 
    }
   
    
    @Post()
    createAsignatura(@Body() createAsignaturaDto: CreateAsignaturaDto) {
        return this.asignaturaService.createAsignatura(createAsignaturaDto); 
    }
    @Get(':nivel')
    getAsignaturaByNivel(@Param('nivel') nivel: Number) {
        return this.asignaturaService.getbynivel(nivel); 
    }
    @Get(':NRC')
    getAsignaturaByNRC(@Param('NRC') NRC: string) {
        return this.asignaturaService.getbyNRC(NRC); 
    }
    @Get(':nombre')
    getAsignaturaByNombre(@Param('nombre') nombre: string) {
        return this.asignaturaService.getbyNombre(nombre);
    }
    @Get(':Horario')
    getAsignaturaByHorario(@Param('Horario') Horario: string) {
        return this.asignaturaService.getbyHorario(Horario); 
    }
    @Patch('/eliminar/:id')
    eliminarAsignatura(@Param('id') id: number) {
        return this.asignaturaService.eliminarAsignatura(id); 
    }
    

  
}
