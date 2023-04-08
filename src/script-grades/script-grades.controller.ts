import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ScriptGradesService } from './script-grades.service';
import { CreateScriptGradeDto } from './dto/create-script-grade.dto';
import { UpdateScriptGradeDto } from './dto/update-script-grade.dto';
import { SubmitScriptGradesDto } from './dto/submit-script-grades.dto copy';

@Controller('scriptgrades')
export class ScriptGradesController {
  constructor(private readonly scriptGradesService: ScriptGradesService) {}

  @Post()
  create(@Body() createScriptGradeDto: CreateScriptGradeDto) {
    return this.scriptGradesService.create(createScriptGradeDto);
  }

  @Post('submit')
  submit(@Body() createScriptGradeDto: SubmitScriptGradesDto) {
    return this.scriptGradesService.submit(createScriptGradeDto);
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
}
