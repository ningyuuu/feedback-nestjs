import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { GradingsService } from 'src/gradings/gradings.service';
import { ScriptsService } from 'src/scripts/scripts.service';
import { CreateScriptGradeDto } from './dto/create-script-grade.dto';
import { UpdateScriptGradeDto } from './dto/update-script-grade.dto';
import { ScriptGrade } from './entities/script-grade.entity';

@Injectable()
export class ScriptGradesService {
  constructor(
    @InjectRepository(ScriptGrade)
    private readonly scriptGradeRepository: EntityRepository<ScriptGrade>,
    private readonly scriptsService: ScriptsService,
    private readonly gradingsService: GradingsService,
  ) {}
  async create(createScriptGradeDto: CreateScriptGradeDto) {
    const script = await this.scriptsService.findOne(createScriptGradeDto.script);
    if (!script) {
      throw new Error('Script not found');
    }

    const grading = await this.gradingsService.findOne(createScriptGradeDto.grading);
    if (!grading) {
      throw new Error('Grading not found');
    }

    const scriptGrade = this.scriptGradeRepository.create(createScriptGradeDto);
    await this.scriptGradeRepository.flush();

    return scriptGrade;
  }

  findAll() {
    return this.scriptGradeRepository.findAll();
  }

  findOne(id: number) {
    return this.scriptGradeRepository.findOne({ id });
  }

  async update(id: number, updateScriptGradeDto: UpdateScriptGradeDto) {
    const scriptGrade = await this.scriptGradeRepository.findOne({ id });
    if (!scriptGrade) {
      throw new Error('ScriptGrade not found');
    }

    if (updateScriptGradeDto.grade) {
      scriptGrade.grade = updateScriptGradeDto.grade;
    }

    if (updateScriptGradeDto.comments) {
      scriptGrade.comments = updateScriptGradeDto.comments;
    }

    await this.scriptGradeRepository.flush();
    return scriptGrade;
  }
}
