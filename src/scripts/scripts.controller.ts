import { Controller, Get, Post, Body, Patch, Param, Res } from '@nestjs/common';
import { ScriptsService } from './scripts.service';
import { CreateScriptDto } from './dto/create-script.dto';
import { AssignScriptDto } from './dto/assign-script.dto';
import { Response } from 'express';

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

  @Get('file/:id')
  async getFile(@Param('id') id: number, @Res() res: Response) {
    const url = await this.scriptsService.getUrl(id);
    const file = await this.scriptsService.getFile(url);
    file.pipe(res);
  }

  @Patch(':id/assign')
  assign(@Param('id') id: string, @Body() assignScriptDto: AssignScriptDto) {
    return this.scriptsService.assign(+id, assignScriptDto);
  }
}
