import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment) private readonly assignmentRepo: EntityRepository<Assignment>,
  ) {}
  create(createAssignmentDto: CreateAssignmentDto) {
    const assignment = this.assignmentRepo.create(createAssignmentDto);
    return this.assignmentRepo.persistAndFlush(assignment);
  }

  findAll() {
    return this.assignmentRepo.findAll();
  }

  findOne(id: number) {
    return this.assignmentRepo.findOne(id);
  }
}
