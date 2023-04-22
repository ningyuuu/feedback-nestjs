import { Controller, Get, Param } from '@nestjs/common';
import { GradingsService } from './gradings.service';

@Controller('gradings')
export class GradingsController {
  constructor(private readonly gradingsService: GradingsService) {}

  @Get()
  findAll() {
    return this.gradingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gradingsService.findOne(+id);
  }
}
