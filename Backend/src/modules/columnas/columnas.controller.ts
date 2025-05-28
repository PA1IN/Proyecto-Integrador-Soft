import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColumnasService } from './columnas.service';
import { CreateColumnaDto } from './dto/create-columna.dto';
import { UpdateColumnaDto } from './dto/update-columna.dto';
import { AsociarColumnaDto } from './dto/asociar-columna.dto';

@Controller('columnas')
export class ColumnasController {
  constructor(private readonly columnasService: ColumnasService) {}

  @Post()
  create(@Body() dto: AsociarColumnaDto) {
    return this.columnasService.create(dto);
  }

  @Get()
  findAll() {
    return this.columnasService.findAll();
  }

  @Get(':calendarioid')
  findByCalendario(@Param('calendarioid') calendarioId: string) {
    return this.columnasService.findByCalendario(+calendarioId);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.columnasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColumnaDto: UpdateColumnaDto) {
    return this.columnasService.update(+id, updateColumnaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnasService.remove(+id);
  }
}
