import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UseService } from './use.service';
import { CreateUseDto } from './dto/create-use.dto';
import { UpdateUseDto } from './dto/update-use.dto';

@Controller('use')
export class UseController {
  constructor(private readonly useService: UseService) {}

  @Post()
  create(@Body() createUseDto: CreateUseDto) {
    return this.useService.create(createUseDto);
  }

  @Get()
  findAll() {
    return this.useService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.useService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUseDto: UpdateUseDto) {
    return this.useService.update(+id, updateUseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.useService.remove(+id);
  }
}
