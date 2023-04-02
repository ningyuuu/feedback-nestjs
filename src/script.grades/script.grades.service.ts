import { Injectable } from '@nestjs/common';
import { CreateScriptGradeDto } from './dto/create-script.grade.dto';
import { UpdateScriptGradeDto } from './dto/update-script.grade.dto';

@Injectable()
export class ScriptGradesService {
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
