import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScriptGradesService } from './script.grades.service';
import { CreateScriptGradeDto } from './dto/create-script.grade.dto';
import { UpdateScriptGradeDto } from './dto/update-script.grade.dto';

@Controller('script.grades')
export class ScriptGradesController {
  constructor(private readonly scriptGradesService: ScriptGradesService) {}

  @Post()
  create(@Body() createScriptGradeDto: CreateScriptGradeDto) {
    return this.scriptGradesService.create(createScriptGradeDto);
  }

  @Get()
  findAll() {
    return this.scriptGradesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scriptGradesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScriptGradeDto: UpdateScriptGradeDto) {
    return this.scriptGradesService.update(+id, updateScriptGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scriptGradesService.remove(+id);
  }
}
