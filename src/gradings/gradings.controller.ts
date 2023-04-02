import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GradingsService } from './gradings.service';
import { CreateGradingDto } from './dto/create-grading.dto';

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
}
