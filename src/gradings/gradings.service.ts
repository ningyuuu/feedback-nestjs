import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { AssignmentsService } from 'src/assignments/assignments.service';
import { CreateGradingDto } from './dto/create-grading.dto';
import { Grading } from './entities/grading.entity';

@Injectable()
export class GradingsService {
  constructor(
    @InjectRepository(Grading) private readonly gradingRepo: EntityRepository<Grading>,
    private readonly assignmentsService: AssignmentsService,
  ) {}
  async create(assignment: number, createGradingDto: CreateGradingDto) {
    const obj = this.assignmentsService.findOne(assignment);
    if (!obj) {
      throw new Error('Assignment not found');
    }

    const grading = this.gradingRepo.create({ assignment, ...createGradingDto });
    await this.gradingRepo.persistAndFlush(grading);
    return grading;
  }

  findAll() {
    return this.gradingRepo.findAll();
  }

  findOne(id: number) {
    return this.gradingRepo.findOne({ id });
  }

  bulkDelete(ids: number[], owner: number) {
    return this.gradingRepo.nativeDelete({ id: { $in: ids }, assignment: { project: { owner } } });
  }

  update(id: number, updateGradingDto: CreateGradingDto, owner: number) {
    return this.gradingRepo.nativeUpdate(
      { id, assignment: { project: { owner } } },
      updateGradingDto,
    );
  }
}
