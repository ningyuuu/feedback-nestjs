import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import { CreateScriptDto } from './dto/create-script.dto';
import { AssignScriptDto } from './dto/assign-script.dto';

@Controller('scripts')
export class ScriptsController {
  constructor(private readonly scriptsService: ScriptsService) {}

  @Post()
  create(@Body() createScriptDto: CreateScriptDto) {
    return this.scriptsService.create(createScriptDto);
  }

  @Get()
  findAll() {
    return this.scriptsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scriptsService.findOne(+id);
  }

  @Patch(':id/assign')
  assign(@Param('id') id: string, @Body() assignScriptDto: AssignScriptDto) {
    return this.scriptsService.assign(+id, assignScriptDto);
  }
}
