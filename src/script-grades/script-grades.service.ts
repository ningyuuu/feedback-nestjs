import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { GradingsService } from 'src/gradings/gradings.service';
import { ScriptsService } from 'src/scripts/scripts.service';
import { CreateScriptGradeDto } from './dto/create-script-grade.dto';
import { UpdateScriptGradeDto } from './dto/update-script-grade.dto';
import { ScriptGrade } from './entities/script.grade.entity';

@Injectable()
export class ScriptGradesService {
  constructor(
    @InjectRepository(ScriptGrade)
    private readonly scriptGradeRepository: EntityRepository<ScriptGrade>,
    private readonly scriptsService: ScriptsService,
    private readonly gradingsService: GradingsService,
  ) {}
  create(createScriptGradeDto: CreateScriptGradeDto) {
    return 'This action adds a new scriptGrade';
  }

  findAll() {
    return `This action returns all scriptGrades`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scriptGrade`;
  }

  update(id: number, updateScriptGradeDto: UpdateScriptGradeDto) {
    return `This action updates a #${id} scriptGrade`;
  }

  remove(id: number) {
    return `This action removes a #${id} scriptGrade`;
  }
}
