import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GradingsService } from './gradings.service';
import { CreateGradingDto } from './dto/create-grading.dto';
import { UpdateGradingDto } from './dto/update-grading.dto';

@Controller('gradings')
export class GradingsController {
  constructor(private readonly gradingsService: GradingsService) {}

  @Post()
  create(@Body() createGradingDto: CreateGradingDto) {
    return this.gradingsService.create(createGradingDto);
  }

  @Get()
  findAll() {
    return this.gradingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradingDto: UpdateGradingDto) {
    return this.gradingsService.update(+id, updateGradingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradingsService.remove(+id);
  }
}
