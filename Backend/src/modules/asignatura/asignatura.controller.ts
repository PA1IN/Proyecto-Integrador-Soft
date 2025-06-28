import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AsignaturaService } from './asignatura.service';
import { CreateAsignaturaDto } from './dto/create-asignatura.dto';
import { HorarioAsignaturaDto } from './dto/horario-asignatura.dto';
import { AgregarProfesorDto } from './dto/agregarprofesor.dto';
import { asignaturaprodDto } from './dto/asignaturaprod.dto';
import { CrearenmasaDto } from './dto/crearenmasa.dto';

@Controller('asignatura')
export class AsignaturaController {

    constructor(
        private readonly asignaturaService: AsignaturaService, // Inject your service here
    ) {}
    
    @Get()
    getAsignaturasc() {
        return this.asignaturaService.getcreadasnt(); 
    }
    @Get('creadas')
    getAsignaturasCreada() {
        return this.asignaturaService.getAsignaturasc(); 
    }
   
    
    @Post()
    createAsignatura(@Body() createAsignaturaDto: CreateAsignaturaDto) {
        return this.asignaturaService.createAsignatura(createAsignaturaDto); 
    }
    @Post('prod')
    createAsignaturaProd(@Body() dto: asignaturaprodDto) {
        return this.asignaturaService.crearasignaturaprod(dto); // Call the service method to create an asignatura in production
    }

    @Get(':nivel')
    getAsignaturaByNivel(@Param('nivel') nivel: number) {
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
    
    @Patch('/eliminar/:id')
    eliminarAsignatura(@Param('id') id: number) {
        return this.asignaturaService.eliminarAsignatura(id); 
    }
    @Get('carrera/:carrera')
    getAsignaturaByCarrera(@Param('carrera') carrera: number) {
        return this.asignaturaService.getAsignaturaBycarrera(carrera); 
    }

    
    @Post('masivo')
    cargaAsignaturaProd(@Body() datos: CrearenmasaDto) {
        console.log(datos)
        return this.asignaturaService.cargaAsignaturaProd(datos); 
    }
    

  
}
