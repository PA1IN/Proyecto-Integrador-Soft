import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColumnasService } from './columnas.service';
import { CreateColumnaDto } from './dto/create-columna.dto';
import { UpdateColumnaDto } from './dto/update-columna.dto';

@Controller('columnas')
export class ColumnasController {
  constructor(private readonly columnasService: ColumnasService) {}

  @Post()
  create(@Body() createColumnaDto: CreateColumnaDto) {
    return this.columnasService.create(createColumnaDto);
  }

  @Get()
  findAll() {
    return this.columnasService.findAll();
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
