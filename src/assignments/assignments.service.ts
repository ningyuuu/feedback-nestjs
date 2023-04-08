import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ProjectsService } from 'src/projects/projects.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment) private readonly assignmentRepo: EntityRepository<Assignment>,
    private readonly projectService: ProjectsService,
  ) {}
  async create(createAssignmentDto: CreateAssignmentDto) {
    const projectId = createAssignmentDto.project;
    const project = await this.projectService.findOne(projectId);

    if (!project) {
      throw new BadRequestException('Project not found');
    }

    const assignment = this.assignmentRepo.create(createAssignmentDto);
    await this.assignmentRepo.persistAndFlush(assignment);
    return assignment;
  }

  findAll() {
    return this.assignmentRepo.findAll();
  }

  findOne(id: number) {
    return this.assignmentRepo.findOne(
      { id },
      { populate: ['scripts.scriptGrades', 'scripts.student'] },
    );
  }
}
